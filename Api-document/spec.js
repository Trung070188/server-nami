var spec =
{
    swagger: "2.0",    // Phiên bản Swagger UI
    info: {
        description:
            "Các thông tin mô tả về dự án và API",
        version: "1.0",    // Phiên bản API
        title: "NamiGame - Blumgi"
    },
    host: "http:/14.225.207.76:3000",    // Server và port deploy API
    basePath: "/api/v1",       // Đường dẫn tới API
    tags: [ 
        {
            name: "IP",
            description: "Lấy ra vị trí của user"
        } ,  // Danh sách các nhóm API: admin, users, images,...
        {
            name: "User",                                   // Tên nhóm API
            description: "Các API User",    // Mô tả về nhóm API
        }
    ],
    schemes: ["http"],    // Sử dụng scheme gì? HTTP, HTTPS?
    paths: {
        "/address":{
            get: {
                tags: ["IP"],
                summary: "Lấy ra vị trí của user",
                description: "",
                operationId: "getIP",
                consumes: ["multipart/form-data"],    // Loại dữ liệu gửi đi
                produces: ["application/json"],       // Loại dữ liệu trả về
                responses: {
                    200: {
                        description: "status: 201 CREATED"
                    },
                },

            }
        },
        "/user/": {    // Đường dẫn. Kết hợp với host và basePath sẽ thành localhost:3000/api/v1/admin/
            post: {        // Phương thức gửi request: get, post, put, delete
                tags: ["User"],
                summary: "Tạo mới user",
                description: "Khi tạo mới user nếu quốc gia của user đó chưa có ai chơi thì hệ thống tự động tạo ra 50 user được random điểm số trong 1 khoảng và có status = 0",
                operationId: "createNewAdminAccount",
                consumes: ["multipart/form-data"],    // Loại dữ liệu gửi đi
                produces: ["application/json"],       // Loại dữ liệu trả về
                parameters: [               // Các tham số
                    {
                        "in": "formData",      // Tham số được gửi lên từ form
                        "name": "address",    // Tên tham số
                        "required": "true",    // Tham số là bắt buộc
                        "schema": {
                            "type": "string"   // Loại dữ liệu của tham số là chuỗi
                        },
                        "description": "address được lấy từ IP user"
                    },
                    {
                        "in": "formData",
                        "name": "device_uid",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Lấy device_uid của user"
                    },
                    {
                        "in": "formData",
                        "name": "score",
                        "required": "true",
                        "schema": {
                            "type": "number"
                        },
                        "description": "Khi tạo mới mặc định để score = 0"
                    },
                    {
                        "in": "formData",
                        "name": "status",
                        "required": "true",
                        "schema": {
                            "type": "number"
                        },
                        "description": "Khi tạo mới status = 1"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 201 CREATED"
                    },
                },
                security: [
                    
                ]
            }
        },
        "/user/{id}": {
            put: {
                tags: ["User"],
                summary: "Update user",
                description: "",
                operationId: "getRankUser",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "schema": {
                            "type": "integer",
                            "minimum": "1"
                        },
                        "description": "id của user"
                    },
                    {
                        "in": "path",
                        "name": "score",
                        "required": "true",
                        "schema": {
                            "type": "integer",
                            "minimum": "1"
                        },
                        "description": "Điểm số của user"
                    }
                ],
                responses: {
                    200: {                                     // Mã trả về 200
                        description: "Lấy dữ liệu thành công",    // Mô tả kết quả trả về
                        schema: {
                            $ref: "#/definitions/admin"           // Dữ liệu trả về là đói tượng admin (tham chiếu với phần definitions ở cuối)
                        }
                    },
                },
                security: [
                    
                ]
            },
        },
        "/user/rank/{id}" : {
            get: {
                tags: ["User"],
                summary: "Lấy ra rank user trên cùng đất nước, và thế giới",
                description: "",
                operationId: "getAdminAccountByID",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "schema": {
                            "type": "integer",
                            "minimum": "1"
                        },
                        "description": "id của user"
                    },
                ],
                responses: {
                    200: {                                     // Mã trả về 200
                        description: "Lấy dữ liệu thành công",    // Mô tả kết quả trả về
                    },
                },
                security: [
                    
                ]
            },
        },
        "/user/rank-address/{address}" : {
            get: {
                tags: ["User"],
                summary: "Lấy ra limit 50 user đã được sắp xếp theo điểm số theo khu vực",
                description: "Nếu 2 user cùng điểm số sẽ sắp xếp theo thời gian khới tạo {created_at}",
                operationId: "getRankAddress",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "address",
                        "required": "true",
                        "schema": {
                            "type": "string",
                            "minimum": "1"
                        },
                        "description": "Vị trí của user"
                    }

                ],
                responses: {
                    200: {                                    
                        description: "Lấy dữ liệu thành công",    
                    },
                },

            }
        },
        "/get-rank-all/" : {
            get: {
                tags: ["User"],
                summary: "Lấy ra limit 50 user đã được sắp xếp theo điểm số tất cả các khu vực",
                description: "Nếu 2 user cùng điểm số sẽ sắp xếp theo thời gian khới tạo {created_at}",
                operationId: "getRankAddressAll",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                ],
                responses: {
                    200: {                                    
                        description: "Lấy dữ liệu thành công",    
                    },
                },

            }
        }
    },
    

    securityDefinitions: {    // Thông tin về api key sử dụng để thực hiện request
        api_key: {
            type: "apiKey",      // Thuộc loại api key xác thực
            name: "api_key",     // Tên trường chứa api key xác thực
            in: "header",        // API key được để trong phần header của request
        }
    },
    definitions: {            // Thông tin các đối tượng sẽ trả về
        users: {                 // Tên đối tượng
            type: "object",         // Loại đối tượng là object
            properties: {           // Các thuộc tính của đối tượng
                id: {                  // Tên thuộc tính
                    type: "integer"    // Loại dữ liệu là số nguyên
                },
                status: {
                    type: "integer"     // Loại dữ liệu là chuỗi
                },
                device_uid: {
                    type: "string"
                },
                score: {
                    type: "integer"
                },
                address: {
                    type: "string"
                }
            }
        },
        address: {
            type: "object",
            properties: {
                id: {
                    type: "integer"
                },
                country: {
                    type: "string"
                }
            }
        }
    }
};
