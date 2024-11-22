let currentID = 1;
let records = JSON.parse(localStorage.getItem("records")) || [];

// تحميل البيانات من localStorage عند فتح الصفحة
function loadData() {
  records.forEach((record) => addRowToTable(record));
  if (records.length > 0) {
    currentID = Math.max(...records.map((record) => record.id)) + 1;
  }
}

// إضافة صف إلى الجدول
function addRowToTable(record) {
  const table = document.getElementById("data-table").querySelector("tbody");

  const row = document.createElement("tr");
  row.dataset.id = record.id;

  row.innerHTML = `
    <td>${record.id}</td>
    <td>${record.name}</td>
    <td>${record.phone}</td>
    <td>${record.age}</td>
    <td>${record.gender}</td>
    <td>${record.date}</td>
    <td>${record.rightSpherical}</td>
    <td>${record.rightAstigmatism}</td>
    <td>${record.rightAxis}</td>
    <td>${record.leftSpherical}</td>
    <td>${record.leftAstigmatism}</td>
    <td>${record.leftAxis}</td>
    <td>${record.nextVisit}</td>
    <td>${record.remainingDays}</td>
    <td>${record.notes}</td>
    <td>
      <button onclick="editData(${record.id})">تعديل</button>
      <button onclick="deleteData(${record.id})">حذف</button>
    </td>
  `;
  table.appendChild(row);
}

// حفظ البيانات
function saveData() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const date = document.getElementById("date").value;
  const nextVisit = document.getElementById("next-visit").value;
  const rightSpherical = document.getElementById("right-spherical").value;
  const rightAstigmatism = document.getElementById("right-astigmatism").value;
  const rightAxis = document.getElementById("right-axis").value;
  const leftSpherical = document.getElementById("left-spherical").value;
  const leftAstigmatism = document.getElementById("left-astigmatism").value;
  const leftAxis = document.getElementById("left-axis").value;
  const notes = document.getElementById("notes").value;

  // حساب الأيام المتبقية للزيارة المقبلة
  const remainingDays = calculateRemainingDays(nextVisit);

  const newRecord = {
    id: currentID,
    name,
    phone,
    age,
    gender,
    date,
    rightSpherical,
    rightAstigmatism,
    rightAxis,
    leftSpherical,
    leftAstigmatism,
    leftAxis,
    nextVisit,
    remainingDays,
    notes,
  };

  // إضافة السجل إلى المصفوفة وتحديث localStorage
  records.push(newRecord);
  localStorage.setItem("records", JSON.stringify(records));

  // تحديث الجدول
  addRowToTable(newRecord);

  // تحديث رقم التسلسلي
  currentID++;

  // إعادة تعيين الحقول
  document.getElementById("eye-form").reset();
}

// حساب الأيام المتبقية
function calculateRemainingDays(nextVisit) {
  if (!nextVisit) return "لا يوجد موعد";
  const today = new Date();
  const visitDate = new Date(nextVisit);
  const diffTime = visitDate - today;
  return diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : "متأخر";
}

// تعديل البيانات
function editData(id) {
  const record = records.find((r) => r.id === id);
  if (!record) return;

  // تعبئة النموذج بالبيانات
  document.getElementById("name").value = record.name;
  document.getElementById("phone").value = record.phone;
  document.getElementById("age").value = record.age;
  document.getElementById("gender").value = record.gender;
  document.getElementById("date").value = record.date;
  document.getElementById("next-visit").value = record.nextVisit;
  document.getElementById("right-spherical").value = record.rightSpherical;
  document.getElementById("right-astigmatism").value = record.rightAstigmatism;
  document.getElementById("right-axis").value = record.rightAxis;
  document.getElementById("left-spherical").value = record.leftSpherical;
  document.getElementById("left-astigmatism").value = record.leftAstigmatism;
  document.getElementById("left-axis").value = record.leftAxis;
  document.getElementById("notes").value = record.notes;

  // تعديل السجل عند الحفظ
  deleteData(id);
}

// حذف البيانات
function deleteData(id) {
  records = records.filter((record) => record.id !== id);
  localStorage.setItem("records", JSON.stringify(records));

  const row = document.querySelector(`tr[data-id="${id}"]`);
  if (row) row.remove();
}

// تحميل البيانات عند فتح الصفحة
document.addEventListener("DOMContentLoaded", loadData);
