function ajax(url, options) {

    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.open(options.method || 'GET', url);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {

            let data;

            try {

                data = JSON.parse(xhr.responseText);

            } catch (err) {

                data = xhr.responseText;

            }

            if (xhr.status === 200) {

                resolve(data);

            } else {

                console.error(data);

                reject(data || xhr.statusText);

            }

        };

        xhr.send(options.body && JSON.stringify(options.body));

    });

}

export default ajax;
