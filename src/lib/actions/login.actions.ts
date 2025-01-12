
interface Otp {
    username: string;
    otp: string;
}

export async function postCodeOtp(data: Otp) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/verify-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const errorDetails = await res.text();
            console.error("Error del servidor:", errorDetails);
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}