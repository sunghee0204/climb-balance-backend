# Backend-Server

⭐️ Software Maestro 13th project ⭐️

---

### 📌 Task

- [x] Connect Mongodb
- [x] Loacl JWT API
- [x] Social Login API
- [ ] Video Upload API
- [ ] Video Streaming API

---

### 🚨 Local Server URL (Server Host) 🚨

```text
http://54.180.155.137:3000
```

---

### 🌸 Overview

| HTTP METHOD |  End Point  |  Description  |
| :---------: | :---------: | :-----------: |
|     GET     | /auth/naver |  Naver Login  |
|     GET     |   /token    | token Refresh |
|     GET     |    /user    | Get User Data |

---

#### 🧡 Naver Login

##### 📌 Request Body

```json
{

}
```

##### 📌 Server Response

```json
{
  "success": true,
  "access_token": "random_access_token",
  "refresh_token": "random_refresh_token"
}
```

---

#### 🧡 Token Refresh

##### 📌 Request Body

```json
{
  "refresh_token": "random_refresh_token"
}
```

##### 📌 Server Response

```json
{
  "success": true,
  "access_token": "random_access_token",
  "refresh_token": "random_refresh_token"
}
```

---

#### 🧡 Get User Data

##### 📌 Request Header

```json
{
  "Authorization": "bearer random_access_token"
}
```

##### 📌 Server Response

```json
{
  "success": true,
  "data": [
    {
      "_id": "62cd2d591fe4da1648aae3e2",
      "id": "X4c_JL0IizyCUnXaYPZ95t2REfHMG4h2_7oK7TBvH0c",
      "email": "elon@tesla.com",
      "sex": null,
      "access_token": "random_access_token",
      "refresh_token": "random_refresh_token",
      "createdAt": "2022-07-12T08:14:17.173Z",
      "updatedAt": "2022-07-12T08:43:43.523Z",
      "__v": 0
    }
  ]
}
```
