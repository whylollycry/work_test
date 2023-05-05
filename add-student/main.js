// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

const studentsList = [{
  lastname: 'Иванов',
  name: 'Игорь',
  surname: 'Сергеевич',

  birthDay: new Date(2000, 06, 14),
  startYear: 2018,
  faculty: 'Экономический'
},
{
  lastname: 'Петров',
  name: 'Семен',
  surname: 'Игоревич',

  birthDay: new Date(1999, 01, 23),
  startYear: 2017,
  faculty: 'Юридический'
},
{
  lastname: 'Васильева',
  name: 'Ирина',
  surname: 'Петровна',

  birthDay: new Date(2002, 04, 03),
  startYear: 2020,
  faculty: 'Искусств'
},
{
  lastname: 'Иванов',
  name: 'Богдан',
  surname: 'Сергеевич',

  birthDay: new Date(1998, 06, 24),
  startYear: 2016,
  faculty: 'Экономический'
},
{
  lastname: 'Некрасов',
  name: 'Лев',
  surname: 'Яковлевич',

  birthDay: new Date(2001, 11, 18),
  startYear: 2019,
  faculty: 'Строительный'
}
]

let today = new Date();

//объявляем основу таблицы и добавляем ее тело
const $app = document.getElementById('app'),
      $table = document.getElementById('table'),
      $tHead = document.getElementById('thead'),
      $trHead = document.getElementById('tr-head'),
      $tBody = document.createElement('tbody');

$app.append($table)
$table.append($tHead)
$tHead.append($trHead)
$table.append($tBody)
//Объявляет форму добавления студентов
const $formEnter = document.getElementById('form-enter'),
      $inputName = document.querySelector('.input__name'),
      $inputLastname = document.querySelector('.input__lastname'),
      $inputSurname = document.querySelector('.input__surname'),
      $inputBirth = document.querySelector('.input__birth'),
      $inputStartYear = document.querySelector('.input__start-year'),
      $inputFaculty = document.querySelector('.input__faculty'),
      $error = document.querySelector('.error'),
      $btnAdd = document.querySelector('.btn-add');
    
$formEnter.append($inputName)
$formEnter.append($inputLastname)
$formEnter.append($inputSurname)
$formEnter.append($inputBirth)
$formEnter.append($inputStartYear)
$formEnter.append($inputFaculty)
$formEnter.append($error)
$formEnter.append($btnAdd)

//функция расчета возраста по дате рождения
function calcAge(birthDate) {
  let today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  let month = today.getMonth() - birthDate.getMonth();
  if(month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Этап 3. Создайте функцию вывода одного студента в таблицу. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.
function getStudentItem(studentObj) {
  //объявляем переменную конца обучения
  let finishDate = +studentObj.startYear + 4;

  const $studentTr = document.createElement('tr'),
        $studentFIO = document.createElement('td'),
        $studentFaculty = document.createElement('td'),
        $studentBirth = document.createElement('td'),
        $studentStartYear = document.createElement('td'),
        $btnDeleteWrap = document.createElement('td'),
        $studentBtnDelete = document.createElement('button');

  $studentBtnDelete.classList.add('btn', 'btn-danger')
  $studentBtnDelete.textContent = 'Удалить'

  //обработчик события кнопки "УДАЛИТЬ"
  $studentBtnDelete.addEventListener('click', function() {
    $studentTr.remove()
  })
        
  $studentFIO.textContent = `${studentObj.lastname} ${studentObj.name} ${studentObj.surname}`
  $studentFaculty.textContent = studentObj.faculty
  //считаем возраст студента
  const birthDate = studentObj.birthDay;
  const age = calcAge(birthDate);

  $studentBirth.textContent = `${studentObj.birthDay.toLocaleDateString()} (${age} лет)`
  $studentStartYear.textContent = studentObj.startYear + "-" + finishDate + " " + "(" + (today.getFullYear() - studentObj.startYear) + " " + "курс)";
  //проверяет текущий год
  if(finishDate == today.getFullYear()) {
    if(8 < today.getMonth()) {
      $studentStartYear.textContent = studentObj.startYear + "-" + finishDate + " " + "(Закончил)";
    }
  }
  //проверяет прошлый год
  if(finishDate < today.getFullYear()) {
    $studentStartYear.textContent = studentObj.startYear + "-" + finishDate + " " + "(Закончил)";
  }

  $studentTr.append($studentFIO)
  $studentTr.append($studentFaculty)
  $studentTr.append($studentBirth)
  $studentTr.append($studentStartYear)
  $studentTr.append($btnDeleteWrap)
  $btnDeleteWrap.append($studentBtnDelete)

  return $studentTr
}


// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.
function renderStudentsTable(studentsArray) {
  $tBody.innerHTML = ''; //Очищает содержимое <tbody> таблицы перед добавлением новых строк

  for (let student of studentsArray) {
    const $studentTr = getStudentItem(student);
    $tBody.append($studentTr)
  }
}
//просто вызов функции чтобы показать студентов в таблице
renderStudentsTable(studentsList)

// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.

$formEnter.addEventListener('submit', function(e) {
  //чтобы при отправке формы не перезагружалась страница
  e.preventDefault();

  if($inputName.value.trim() === "") {
    $error.textContent = 'Введите имя'
    return
  };

  if($inputLastname.value.trim() === "") {
    $error.textContent = 'Введите фамилию'
    return
  };

  if($inputSurname.value.trim() === "") {
    $error.textContent = 'Введите отчество'
    return
  };

  if($inputBirth.value.trim() === "") {
    $error.textContent = 'Введите дату рождения'
    return
  };

  if($inputStartYear.value.trim() === "") {
    $error.textContent = 'Введите год начала обучения'
    return
  };

  if($inputFaculty.value.trim() === "") {
    $error.textContent = 'Введите факультет'
    return
  };


  const newStudent = {
    lastname: $inputLastname.value.trim().charAt(0).toUpperCase() + $inputLastname.value.slice(1).toLowerCase(),
    name: $inputName.value.trim().charAt(0).toUpperCase() + $inputName.value.slice(1).toLowerCase(),
    surname: $inputSurname.value.trim().charAt(0).toUpperCase() + $inputSurname.value.slice(1).toLowerCase(),
    birthDay: new Date($inputBirth.value.trim()),
    startYear: $inputStartYear.value.trim(),
    faculty: $inputFaculty.value.trim().charAt(0).toUpperCase() + $inputFaculty.value.slice(1).toLowerCase()
  };

  studentsList.push(newStudent); //Добавляет в массив данные о новом студенте

  renderStudentsTable(studentsList);
  //обнуляем значения полей, чтобы не пришлось стирать его вручную
  $inputName.value = '';
  $inputLastname.value = '';
  $inputSurname.value = '';
  $inputBirth.value = '';
  $inputStartYear.value = '';
  $inputFaculty.value = '';
})

// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.
//Сначала объявим заголовки в таблице
const $thHeadFIO = document.querySelector('.th-fio'),
      $thHeadFaculty = document.querySelector('.th-faculty'),
      $thHeadBirth = document.querySelector('.th-birth'),
      $thHeadStartYear = document.querySelector('.th-start'),
      $thHeadDelete = document.querySelector('.th-delete');

$trHead.append($thHeadFIO)
$trHead.append($thHeadFaculty)
$trHead.append($thHeadBirth)
$trHead.append($thHeadStartYear)
$trHead.append($thHeadDelete)

//Создаем события кликов для сортировки студентов в таблице
//Сортировка по ФИО
$thHeadFIO.addEventListener('click', function() {
  let sortTableFIO = studentsList.sort(function(a, b) {
    if(a.lastname == b.lastname) {
      if(a.name < b.name) return -1;
      if(a.name == b.name) {
        if(a.surname < b.surname) return -1;
      }
    }
    if(a.lastname < b.lastname) return -1;
  });
  renderStudentsTable(sortTableFIO)
});
//Сортировка по факультету
$thHeadFaculty.addEventListener('click', function() {
  let sortTableFaculty = studentsList.sort(function(a, b) {
    if(a.faculty < b.faculty) return -1;
  });
  renderStudentsTable(sortTableFaculty)
});
//Сортировка по дате рождения и возрасту
$thHeadBirth.addEventListener('click', function() {
  let sortTableBirth = studentsList.sort(function(a, b) {
    let dateA = new Date(a.birthDay);
    let dateB = new Date(b.birthDay);
    if(dateA > dateB) return -1;
  });
  renderStudentsTable(sortTableBirth)
});
//Сортировка по годам обучения
$thHeadStartYear.addEventListener('click', function() {
  let sortTableStartY = studentsList.sort(function(a, b) {
    if(a.startYear > b.startYear) return -1;
  });
  renderStudentsTable(sortTableStartY)
});
// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.
//Объявляем элементы формы фильтрации
const $formFilter = document.getElementById('form-filter'),
      $filterFIO = document.querySelector('.filter-fio'),
      $filterFaculty = document.querySelector('.filter-faculty'),
      $filterStartY = document.querySelector('.filter-start-year'),
      $filterFinishY = document.querySelector('.filter-finish-year'),
      $btnFilter = document.querySelector('.btn-filter');

$formFilter.append($filterFIO)
$formFilter.append($filterFaculty)
$formFilter.append($filterStartY)
$formFilter.append($filterFinishY)
$formFilter.append($btnFilter)
//Функция фильтрации
/*
for(const student of studentsList) {
  student.fio = student.lastname + ' ' + student.name + ' ' + student.surname,
  student.finish = +student.startYear + 4;
}
*/
function filter(arr, prop, value) {
  let result = [],
      copy = [...arr]
  for(const item of copy) {
    if(String(item[prop]).includes(value)) result.push(item)
  }
  return result
}

function renderFilter() {
  let newStudentList = [...studentsList];
  
  for(const student of studentsList) {
    student.fio = student.lastname + ' ' + student.name + ' ' + student.surname,
    student.finish = +student.startYear + 4;
  }

  let filterFIO = $filterFIO.value,
      filterFaculty = $filterFaculty.value.trim(),
      filterStartY = $filterStartY.value,
      filterFinishY = $filterFinishY.value;

  if(filterFIO.trim() !== '') {
    newStudentList = filter(newStudentList, 'fio', filterFIO.toLowerCase().split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' '));
  };
  if(filterFaculty !== '') newStudentList = filter(newStudentList, 'faculty', filterFaculty.trim().charAt(0).toUpperCase() + filterFaculty.slice(1).toLowerCase());
  if(filterStartY !== '') newStudentList = filter(newStudentList, 'startYear', filterStartY);
  if(filterFinishY !== '') newStudentList = filter(newStudentList, 'finish', filterFinishY);
 
  renderStudentsTable(newStudentList);
}
//Обработчик события для фильтрации
$formFilter.addEventListener('submit', function(e) {
  //чтобы при отправке формы не перезагружалась страница
  e.preventDefault();

  renderFilter()

});
