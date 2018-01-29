import uav from 'uav';

function dash(user) {

    const component = uav.component(`
    <div>
        {user.name}
        <div class="right">
            <a href="#view=login">Log out</a>
        </div>
    </div>`, {
        user
    });

    return component;

}

export default dash;
