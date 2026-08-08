# QuickBite API Reference

## Auth

| Method | Endpoint | Story | Description |
|---|---|---|---|
| POST | `/api/auth/register` | QFD-9 | Register with mobile number, receive OTP |
| POST | `/api/auth/verify-otp` | QFD-9 | Verify OTP to activate account |
| POST | `/api/auth/login` | QFD-10 | Log in with a verified mobile number |
| POST | `/api/auth/:userId/addresses` | QFD-11 | Add a delivery address |
| GET | `/api/auth/:userId/addresses` | QFD-11 | List saved delivery addresses |
