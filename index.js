const express = require('express');
const body_parser = require('body-parser');
const app = express();

const port = 3000;
app.listen(port, () => {
    console.log("server Start");
});

app.set("view engine", "ejs");
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/view', (req, res) => {
    res.render('view', { students });
  });

let students = [];

app.post('/student_form', (req, res) => {
    let stu = {
        name: req.body.name,
        pass: req.body.pass,
        id: students.length + 1
    };
  
    students.push(stu);
    res.redirect("/view");
});

app.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    students = students.filter(student => student.id != id);
    res.redirect("/view");
  });

  app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    const student = students.find(student => student.id == id);
    res.render("edit", { student });
  });

  app.post("/update/:id", (req, res) => {
    const id = req.params.id;
    const update = {
      id: parseInt(id),
      name: req.body.name,
      pass: req.body.pass,
    };
  
    students = students.map(student => {
      if (student.id == id) {
        return update;
      } else {
        return student;
      }
    });
    
    res.redirect("/view");
  });
  