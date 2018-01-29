import uav from 'uav';

function home() {

    const component = uav.component(`
    <div>
        <div class="right">
            <a href="#view=login">Log in</a>
            <a href="#view=signup">Sign up</a>
        </div>
    </div>`);

    return component;

}

home.public = true;

export default home;
