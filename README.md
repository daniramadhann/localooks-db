# LocaLooks

## Endpoint Autentikasi
- **Endpoint**: http://localhost:5000/login
  - **Method**: POST
  - **Deskripsi**: Endpoint ini digunakan untuk proses login oleh admin.

- **Endpoint**: http://localhost:5000/session
  - **Method**: GET
  - **Deskripsi**: Endpoint ini mengambil data sesi yang diposting oleh pengguna yang telah login dari endpoint /login.

- **Endpoint**: http://localhost:5000/logout
  - **Method**: DELETE
  - **Deskripsi**: Endpoint ini digunakan untuk proses logout dari sistem.

## Endpoint Produk
- **Endpoint**: http://localhost:5000/products
  - **Method**: GET
  - **Deskripsi**: Endpoint ini memungkinkan untuk melihat semua data produk.

- **Endpoint**: http://localhost:5000/products/:id
  - **Method**: GET
  - **Deskripsi**: Endpoint ini memungkinkan untuk melihat data produk berdasarkan ID tertentu

- **Endpoint**: http://localhost:5000/products
  - **Method**: POST
  - **Deskripsi**: Endpoint ini memungkinkan untuk mengunggah produk baru.

- **Endpoint**: http://localhost:5000/products/:id
  - **Method**: PUT
  - **Deskripsi**: Endpoint ini memungkinkan untuk mengedit produk.

- **Endpoint**: http://localhost:5000/products/:id
  - **Method**: DELETE
  - **Deskripsi**: Endpoint ini memungkinkan untuk menghapus produk.

## Endpoint Pengguna
- **Endpoint**: http://localhost:5000/users
  - **Method**: GET
  - **Deskripsi**: Endpoint ini mengambil semua data pengguna.

- **Endpoint**: http://localhost:5000/users
  - **Method**: POST
  - **Deskripsi**: Endpoint ini memungkinkan untuk menambahkan pengguna baru untuk peran admin dan berfungsi sebagai fungsi registrasi.

- **Endpoint**: http://localhost:5000/users/:id
  - **Method**: DELETE
  - **Deskripsi**: Endpoint ini memungkinkan untuk menghapus pengguna.
