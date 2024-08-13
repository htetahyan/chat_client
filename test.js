import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuration options
export let options = {
    vus: 10, // Number of Virtual Usersz
    duration: '30s', // Duration of the test
};

export default function () {
    // HTTP GET request
    let response = http.get('https://example.com');

    // Validate the response
    check(response, {
        'status is 200': (r) => r.status === 200,
    });

    // Sleep for a bit to simulate user activity
    sleep(1);
}
