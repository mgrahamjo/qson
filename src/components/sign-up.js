import uav from 'uav';
import ajax from 'util/ajax';
import router from 'uav-router';

function signUp() {

    const component = uav.component(`
    <div>
        <div class="right">
            <a href="#">Home</a>
            <a href="#view=login">Log in</a>
        </div>
        <form u-class="auth {loading}" u-onsubmit={submit}>
            <p class="center">Sign Up</p>
            <div u-class="error {error && 'visible'}">{error}</div>
            <div>
                <div>Email</div>
                <input type="email" id="email" autofocus u-bind="email"/>
            </div>
            <div>
                <div>Name</div>
                <input type="text" id="name" u-bind="name"/>
            </div>
            <div>
                <div>Password</div>
                <input type="password" id="password" u-bind="password"/>
            </div>
            <div>
                <input type="submit" class="btn"/>
            </div>
        </form>
    </div>`, {
        loading: false,
        error: false,
        email: '',
        name: '',
        password: '',
        submit: e => {

            e.preventDefault();

            component.loading = true;

            ajax('/sign-up', {
                method: 'POST',
                body: {
                    email: component.email,
                    name: component.name,
                    password: component.password
                }
            }).then(data => {

                component.loading = false;

                component.error = false;

                sessionStorage.setItem('sessionId', data.sessionId);

                router.set({view: 'dash'});

            }).catch(data => {

                component.loading = false;

                switch (data.error) {

                case 'Password must be at least 6 characters.':
                    component.error = 'Password must be at least 6 characters.';
                    break;

                case 'Please use a valid email address.':
                    component.error = 'Please use a valid email address.';
                    break;

                case 'That email is already in use.':
                    component.error = 'That email is already in use.';
                    break;

                default:
                    component.error = 'Sorry! Something went wrong.';

                }

            });

        }
    });

    return component;

}

signUp.public = true;

export default signUp;
