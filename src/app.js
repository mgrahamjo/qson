import 'util/polyfills';
import uav from 'uav';
import router from 'uav-router';
import signup from 'components/sign-up';
import login from 'components/log-in';
import dash from 'components/dash';
import home from 'components/home';
import ajax from 'util/ajax';

const routes = {
    signup,
    login,
    dash,
    home
};

const app = uav.component(`
<div>
    {view}
</div>
`, {
    view: null
}, '#app');

router.init(params => {

    const view = routes[params.view || 'home'];

    if (view.public) {

        app.view = view();

    } else {

        const sessionId = sessionStorage.getItem('sessionId');

        if (sessionId) {

            ajax('/session', {
                method: 'POST',
                body: {sessionId}
            }).then(user => {

                app.view = view(user);

            }).catch(() => {

                app.view = login();

            });

        } else {

            app.view = login();

        }

    }

});
