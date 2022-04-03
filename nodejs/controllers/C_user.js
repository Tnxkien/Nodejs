const express = require('express')
const router = express.Router()

// Gọi model
const userModel = require('../models/M_user')
const tokenModel = require('../models/M_token')

// Gọi bcryptjs
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

// Gọi json web token
const jwt = require('jsonwebtoken');
// khóa bí mật
const secret = '#$#@#dsds';

router.get('/list', (req, res) => {
    userModel
    .find()
    .exec((err, data)=>{
        if(err){
            res.send({kq:0, msg: 'Kết nối Database thất bại.'})
        }else{
            res.send({kq:1, data})
        }
    })
})

// xóa all user
router.post('/deleteAll', function (req, res) {
    userModel.deleteMany({}, (err)=>{
        if(err){
            res.send({kq:0, msg: 'Kết nối Database thất bại.'})
        }else{
            res.send({kq:1, msg: 'Đã xóa toàn bộ dữ liệu.'})
        }
    })
})

// xóa all token
router.post('/deleteAllToken', function (req, res) {
    tokenModel.deleteMany({}, (err)=>{
        if(err){
            res.send({kq:0, msg: 'Kết nối Database thất bại.'})
        }else{
            res.send({kq:1, msg: 'Đã xóa toàn bộ dữ liệu.'})
        }
    })
})

// api thêm
router.post('/add', function (req, res) {
    var _username=_password=_email=_phone=error='', flag=1;

    _username=req.body.username;
    _password=req.body.password;
    _email=req.body.email;
    _phone=req.body.phone;

    if(flag==1){
        userModel
        .find({username: _username}, (err, data)=>{
            if(err){
                res.send({kq:0, msg: 'Kết nối Database thất bại.'})
            }else{
                if(data==''){
                    // được phép thêm
                    var hash = bcrypt.hashSync(_password, salt);

                    // Tạo object để thêm vào db
                    const obj = {
                        username: _username,
                        password: hash,
                        email: _email,
                        phone: _phone
                    };

                    userModel.create(obj, (err)=>{
                        if(err){
                            res.send({kq:0, msg: 'Kết nối Database thất bại.'})
                        }else{
                            res.send({kq:1, msg: 'Tạo tài khoản thành công.'})

                            // Gửi mail để kích hoạt tài khoản
                        }
                    })
                }else{
                    res.send({kq:0, msg: 'Tài khoản này đã tồn tại.'})
                }
            }
        })
    }else{
        res.send({kq:0, msg: error})
    }
})

// cập nhật vai trò
router.post('/update', function (req, res) {
    var _id=req.body.id;
    var _role=req.body.role;

    userModel.updateMany({_id}, {role: _role}, (err)=>{
        if(err){
            res.send({kq:0, msg: 'Kết nối Database thất bại.'})
        }else{
            res.send({kq:1, msg: 'Cập nhật thành công.'})
        }
    })
})

// login
router.post('/login', function (req, res) {
    var _username=_password=error='', flag=1;

    _username=req.body.username;
    _password=req.body.password;

    if(flag==1){
        userModel
        .find({username: _username, status: true}, (err, data)=>{
            if(err){
                res.send({kq:0, msg: 'Kết nối Database thất bại.'})
            }else{
                if(data!=''){
                    // check password
                    const check_pass = bcrypt.compareSync(_password, data[0].password);

                    if(check_pass == true){
                        // Lưu lại giá trị khi login thành công
                        const obj_token = {
                            id: data[0]._id,
                            device: req.headers
                        };
                        jwt.sign(obj_token, secret, { expiresIn: 60 * 60 }, (err, token)=>{
                            if(err){
                                res.send({kq:0, msg: 'Lỗi tạo Token'})
                            }else{
                                // Cần lưu lại token vào database Token
                                tokenModel.create({
                                    token,
                                    id_user: data[0]._id,
                                    status: true
                                }, (err)=>{
                                    if(err){
                                        res.send({kq:0, msg: 'Kết nối Database thất bại.'})
                                    }else{
                                        res.cookie('token', token, {maxAge: 60000 * 60}).send({kq:1, msg: 'Đăng nhập thành công'});
                                    }
                                })
                            }
                        });
                    }else{
                        res.send({kq:0, msg: 'Kiểm tra thông tin đăng nhập.'})
                    }
                }else{
                    res.send({kq:0, msg: 'Tài khoản này không tồn tại, hoặc chưa được kích hoạt.'})
                }
            }
        })
    }else{
        res.send({kq:0, msg: error})
    }
})

router.get('/listToken', (req, res) => {
    tokenModel.find().exec((err, data)=>{
        if(err){
            res.send({kq:0, msg: 'Kết nối Database thất bại.'})
        }else{
            res.send({kq:1, data})
        }
    })
})

module.exports = router;