const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_NAME
});

//xem
exports.view = (req , res)=>{

     //connect to DB
    pool.getConnection((err,connection)=>{
        if(err) throw err; //not connected
        console.log('Connected as ID '+ connection.threadId);

        connection.query('SELECT *from sinhvien', (err,rows)=>{

            connection.release();

            if(!err){
                let removedSinhvien = req.query.removed;
                res.render('home',{rows,removedSinhvien});
            }else{
                console.log(err);
            }

            console.log('the data from student table: \n',rows);
        });
    });
 
}
//search
exports.find = (req , res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err; //not connected
        console.log('Connected as ID '+ connection.threadId);

        let searchTerm = req.body.search;

        connection.query('SELECT *from sinhvien WHERE hoten LIKE? OR lop LIKE?' , ['%'+ searchTerm + '%','%'+ searchTerm +'%'], (err,rows)=>{

            connection.release();

            if(!err){
                res.render('home',{rows});
            }else{
                console.log(err);
            }

            console.log('the data from student table: \n',rows);
        });
    });
}


exports.form = (req , res)=>{
    res.render('addsinhvien');
}


//Thêm
exports.create = (req , res)=>{
    const {ten, ngaysinh, lop,gioitinh,monhoc}=req.body;
    
    pool.getConnection((err,connection)=>{
        if(err) throw err; //not connected
        console.log('Connected as ID '+ connection.threadId);
        let searchTerm = req.body.search;
        connection.query('INSERT INTO sinhvien SET hoten = ?, ngaysinh = ?, lop = ?, giotinh = ?, mochoc = ?',[ten, ngaysinh, lop,gioitinh,monhoc],(err,rows)=>{

            connection.release();

            if(!err){
                res.render('addsinhvien',{alert:'Thêm sinh viên thành công.'});
            }else{
                console.log(err);
            }

            console.log('the data from sinhvien table: \n',rows);
        });
    });
}


//sửa
exports.edit = (req , res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err; //not connected
        console.log('Connected as ID '+ connection.threadId);

        connection.query('SELECT *from sinhvien WHERE id= ?', [req.params.id], (err,rows)=>{

            connection.release();

            if(!err){
                res.render('editsinhvien',{rows});
            }else{
                console.log(err);
            }

            console.log('the data from student table: \n',rows);
        });
    });
}


//cập nhật
exports.update = (req , res)=>{
    const {ten, ngaysinh, lop,gioitinh,monhoc}=req.body;

    pool.getConnection((err,connection)=>{
        if(err) throw err; //not connected
        console.log('Connected as ID '+ connection.threadId);

        connection.query('Update sinhvien SET hoten = ?, ngaysinh = ?, lop = ?, giotinh = ?, mochoc = ?  WHERE id=?',[ten, ngaysinh, lop,gioitinh,monhoc,req.params.id],(err,rows)=>{

            connection.release();

            if(!err){
                
                pool.getConnection((err,connection)=>{
                    if(err) throw err; //not connected
                    console.log('Connected as ID '+ connection.threadId);
            
                    connection.query('SELECT *from sinhvien WHERE id= ?', [req.params.id], (err,rows)=>{
            
                        connection.release();
            
                        if(!err){
                            res.render('editsinhvien',{rows, alert: `${ten} đã được cập nhật.`});
                        }else{
                            console.log(err);
                        }
            
                        console.log('the data from sinhvien table: \n',rows);
                    });
                });


            }else{
                console.log(err);
            }

            console.log('the data from student table: \n',rows);
        });
    });
}

//xóa
exports.delete = (req , res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err; //not connected
        console.log('Connected as ID '+ connection.threadId);

        connection.query('DELETE from sinhvien WHERE id= ?', [req.params.id], (err,rows)=>{

            connection.release();

            if(!err){
                let removedSinhvien = encodeURIComponent('Xóa thành công');
                res.redirect('/?removed=' + removedSinhvien);
            }else{
                console.log(err);
            }

            console.log('the data from sinhvien table: \n',rows);
        });
    });
}


//xem
exports.viewall = (req , res)=>{

    //connect to DB
   pool.getConnection((err,connection)=>{
       if(err) throw err; //not connected
       console.log('Connected as ID '+ connection.threadId);

       connection.query('SELECT *from sinhvien WHERE id=?',[req.params.id], (err,rows)=>{

           connection.release();

           if(!err){
               res.render('viewsinhvien',{rows});
           }else{
               console.log(err);
           }

           console.log('the data from student table: \n',rows);
       });
   });

}