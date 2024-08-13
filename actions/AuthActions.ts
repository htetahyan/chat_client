import {toast} from "sonner";
import {SET_TOKEN} from "~/actions/storage";

export const BASE_URL = 'http://localhost:8080/api/v1/admin';
export const loginAction = async ({ phone, password }: { phone: string, password: string }) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({ phone:phone.toString(), password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 200 || response.status === 202) {
        const resp = await response.json();
SET_TOKEN(resp.token);
       toast.success("Successfully logged in");
    }
    if(response.status === 400 ) {
        toast.error("Error logged in");
    }
    if(response.status === 401 || response.status === 403) {
        toast.error("Unauthorized");
    }
};