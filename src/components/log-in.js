import uav from 'uav';
import ajax from 'util/ajax';
import router from 'uav-router';

function logIn() {

    const sessionId = sessionStorage.getItem('sessionId');

    if (sessionId) {

        ajax('/log-out', {
            method: 'POST',
            body: {sessionId}
        }).then(() => sessionStorage.removeItem('sessionId'));

    }

    const component = uav.component(`
    <div>
        <div class="right">
            <a href="#">Home</a>
            <a href="#view=signup">Sign up</a>
        </div>
        <form u-class="auth {loading}" u-onsubmit={submit}>
            <p class="center">Log In</p>
            <div u-class="error {error && 'visible'}">{error}</div>
            <div>
                <div>Email</div>
                <input type="email" id="email" autofocus u-bind="{email}"/>
            </div>
            <div>
                <div>Password</div>
                <input type="password" id="password" u-bind="{password}"/>
            </div>
            <div>
                <input type="submit" class="btn"/>
            </div>
        </form>
    </div>`, {
        loading: false,
        error: false,
        email: '',
        password: '',
        submit: e => {

            e.preventDefault();

            component.loading = true;

            ajax('/log-in', {
                method: 'POST',
                body: {
                    email: component.email,
                    password: component.password
                }
            }).then(data => {

                component.loading = false;

                component.error = false;

                sessionStorage.setItem('sessionId', data.sessionId);

                router.set({view: 'dash'});

            }).catch(() => {

                component.loading = false;

                component.error = 'Whoops! Try again.';

            });

        }
    });

    return component;

}

logIn.public = true;

export default logIn;
