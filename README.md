# Backend-Server

โญ๏ธ Software Maestro 13th project โญ๏ธ

### ๐ Task

- [x] Connect Mongodb
- [x] Loacl JWT API
- [x] Social Login API
- [ ] Video Upload API
- [ ] Video Streaming API


### ๐จ Local Server URL (Server Host) ๐จ

```text
http://54.180.155.137:3000
```


### ๐ธ Overview

| HTTP METHOD |  End Point  |  Description  |
| :---------: | :---------: | :-----------: |
|     GET     | /auth/naver |  Naver Login  |
|     GET     |   /token    | token Refresh |
|     GET     |    /user    | Get User Data |

---

#### ๐งก Naver Login

##### ๐ Request Body

```json
{

}
```

##### ๐ Server Response

```json
{
  "success": true,
  "access_token": "random_access_token",
  "refresh_token": "random_refresh_token"
}
```

---

#### ๐งก Token Refresh

##### ๐ Request Body

```json
{
  "refresh_token": "random_refresh_token"
}
```

##### ๐ Server Response

```json
{
  "success": true,
  "access_token": "random_access_token",
  "refresh_token": "random_refresh_token"
}
```

---

#### ๐งก Get User Data

##### ๐ Request Header

```json
{
  "Authorization": "bearer random_access_token"
}
```

##### ๐ Server Response

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
