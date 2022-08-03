const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'olympicmanagementsystem',
  charset : 'utf8mb4',
  multipleStatements: true
});


// View Users
exports.view = (req, res) => {

  connection.query('SELECT * FROM person', (err, rows) => {

    if (!err) {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from person table: \n', rows);
  });
}

// Find Person by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  connection.query('SELECT * FROM person WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from person table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-user');
}

// Add new person
exports.create = (req, res) => {
  const { first_name, last_name, dob, weight, height, gender, age, phone, role } = req.body;
  let searchTerm = req.body.search;

  
  connection.query('CALL add_person(?,?,?,?,?,?,?,?);', [first_name, last_name, dob,weight,height,gender, phone, role], (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'Person added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from person table: \n', rows);
  });
}


// Edit person
exports.edit = (req, res) => {
  
  connection.query('SELECT * FROM person WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from person table: \n', rows);
  });
}


// Update Person
exports.update = (req, res) => {
    const { first_name, last_name, dob, weight, height, gender, phone, role } = req.body;
  connection.query('CALL update_person(?,?,?,?,?,?,?,?,?);', [req.params.id, first_name, last_name, dob,weight,height,gender,phone, role ], (err, rows) => {

    if (!err) {
      connection.query('SELECT * FROM person WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
          res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
        } else {
          console.log(err);
        }
       
      });
    }
    else {
      console.log(err);
    }
    console.log('The data from person table: \n', rows);
  });
     
}



// View Users
exports.viewall = (req, res) => {

  connection.query('SELECT * FROM person WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from person table: \n', rows);
  });

}

// Delete User
exports.delete = (req, res) => {

    //   Delete a record
    
      connection.query('DELETE FROM person WHERE id = ?', [req.params.id], (err, rows) => {
    
        if (!err) {
            res.redirect('/');
          } else {
            
          }
        //console.log('The data from person table: \n', rows);
    
      });
    
    
    
    }