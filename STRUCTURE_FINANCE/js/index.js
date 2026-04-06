

// const users = [
//     {
//     id: 1,
//     fullName: "Nguyen Van A",
//     email: "nguyenvana@gmail.com",
//     password: "123456",
//     phone: "0987654321",
//     gender: true,
//     status: true
//     },
//     {
//     id: 2,
//     fullName: "Phạm Thị B",
//     email: "phamthib@gmail.com",
//     password: "123456",
//     phone: "0987654321",
//     gender: false,
//     status: true
//     }
// ];
// // loại chi tiêu
const categories = [
    {
    id: 1,
    name: "Tiền đi học",
    imageUrl: "đường dân ảnh",
    status: true
    },
    {
    id: 2,
    name: "Tiền đi chơi",
    imageUrl: "đường dân ảnh",
    status: false
    },
    {
    id: 3,
    name: "Tiền phòng",
    imageUrl: "đường dân ảnh",
    status: false
    },
    {
    id: 4,
    name: "Tiền ăn",
    imageUrl: "đường dân ảnh",
    status: false
    },
    {
    id: 5,
    name: "Tiền đi chơi",
    imageUrl: "đường dân ảnh",
    status: false
    },{
    id: 6,
    name: "Tiền mua đồ",
    imageUrl: "đường dân ảnh",
    status: false
    },{
    id: 7,
    name: "Tiền xe",
    imageUrl: "đường dân ảnh",
    status: false
    },
    {
    id: 8,
    name: "Khác",
    imageUrl: "đường dân ảnh",
    status: false
    }
];

// danh mục hàng tháng
//     const monthlyCategories = [
//     {
//         id: 1,
//         month: "2025-09-30",
//         userId:1,
//         // ngân sách cho từng loại
//         categories: [
//             {
//             id: 1,
//             categoryId: 1,
//             budget: 300000
//             },
//             {
//             id: 2,
//             categoryId: 2,
//             budget: 500000
//             }]
//     },
//      {
//         id: 2,
//         month: "2025-09-30",
//         userId:2,
//         // ngân sách cho từng loại
//         categories: [
//             {
//             id: 1,
//             categoryId: 1,
//             budget: 300000
//             },
//             {
//             id: 2,
//             categoryId: 2,
//             budget: 500000
//             }]
//     }
// ];
// giao dịch
    // const transactions = [];

// //     tránh ghi đe dữ liệu khi load lại trang
        // localStorage.setItem("users", JSON.stringify(users));
        // localStorage.setItem("categories", JSON.stringify(categories));
        // localStorage.setItem("monthlyCategories", JSON.stringify(monthlyCategories));
        // localStorage.setItem("transactions", JSON.stringify(transactions));


//    if (!localStorage.getItem("users")) {
//     localStorage.setItem("users", JSON.stringify(users));
//     }
//     if (!localStorage.getItem("categories")) {
//         localStorage.setItem("categories", JSON.stringify(categories));
//     }
//     if (!localStorage.getItem("monthlyCategories")) {
//         localStorage.setItem("monthlyCategories", JSON.stringify(monthlyCategories));
//     }
//     if (!localStorage.getItem("transactions")) {
//         localStorage.setItem("transactions", JSON.stringify(transactions));
//     };

        // lay du lieu
    let monthlyCategories = JSON.parse(localStorage.getItem("monthlyCategories")) || [];
    let users = JSON.parse(localStorage.getItem("users")) || [];
    // let categories = JSON.parse(localStorage.getItem("categories")) || [];
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let editingId=null;

    if (!currentUser) {
        window.location.replace("../pages/login.html");
    }
     // hàm đăng xuất
    function logOut() {
       
        document.getElementById("logout").style.display="flex";
        // localStorage.removeItem("currentUser");// xóa trạng thái đn
        // window.location.href="../pages/login.html";
        return;
    };
    function cancelLogout() {
        document.getElementById("logout").style.display = "none";
        }
    function deleteLogout() {
        localStorage.removeItem("currentUser");
        window.location.replace("../pages/login.html");
    }

    // phân loại lựa chọn hiển thị
    document.addEventListener("DOMContentLoaded", function() {
        const menuBtns = document.querySelectorAll('.menu-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        menuBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Xóa trạng thái active của tất cả các nút và tab
                menuBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(tab => tab.classList.remove('active-tab'));

                // Kích hoạt nút được bấm và tab tương ứng (this)
                this.classList.add('active');
                // lấy giá trị thuộc tính data-target sau đó tìm tới id target đó rồi gán active
                const targetId = this.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active-tab');
            });
        });
    });
   
    
    // Phần hiển thi thông tin các nhân
    function renderInfomation() {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let nameInput = document.getElementById("infoName");
        let emailInput = document.getElementById("infoEmail");
        let phoneInput = document.getElementById("infoPhone");
        let genderInput = document.getElementById("infoGender");

        nameInput.value = currentUser.fullName || "Chưa cập nhật";
        emailInput.value = currentUser.email || "Chưa cập nhật";
        phoneInput.value = currentUser.phone || "Chưa cập nhật";
        if (currentUser.gender === true) {
        genderInput.value = "Male";
            } else if (currentUser.gender === false) {
                genderInput.value = "Female";
            } else {
                genderInput.value = "Chưa cập nhật";
            }
        }
    renderInfomation();

    const monthInput = document.querySelector(".month-input");
    const budgetInput = document.querySelector(".budget-input");
    const btnSave = document.querySelector(".btn-save");

    // lưu tháng và hạn mức chi tiêu
    function  btnSaveBudget() {
         let monthValue=monthInput.value;
        let budgetValue = Number(budgetInput.value);

        let isValid=true;
        monthInput.style.border = "";
        budgetInput.style.border = "";

        monthInput.addEventListener("change", () => {
            monthInput.style.border = "";
            document.getElementById("checkMonth").style.display = "none";
        });
        budgetInput.addEventListener("input",()=>{
            budgetInput.style.border = "";
            document.getElementById("checkBudget").style.display="none";

        });

        monthInput.style.border="";
         budgetInput.style.border = "";
         document.getElementById("checkMonth").style.display="none";
         document.getElementById("checkBudget").style.display="none";

        if (!monthValue) {
            monthInput.style.border=" 1px solid red";
            document.getElementById("checkMonth").style.display="block";
            if (isValid) monthInput.focus();
            isValid=false;
        };

        if (isNaN(budgetValue ) || budgetValue  <= 0) {
            budgetInput.style.border = "1px solid red";
            document.getElementById("checkBudget").style.display="block";
            if (isValid) budgetInput.focus();
            isValid = false;
        }

        if(!isValid){ return;}
        let checkMonth=monthlyCategories.find(m=>m.month===monthValue &&m.userId===currentUser.id);
        if(checkMonth){
            checkMonth.totalBudget = budgetValue;

        } else{
            monthlyCategories.push({
                id: monthlyCategories.length===0 ? 1: monthlyCategories[monthlyCategories.length-1].id+1,
                month: monthValue,
                userId:currentUser.id,
                totalBudget: budgetValue,
                categories:[], 
            });
            
        }
        localStorage.setItem("monthlyCategories",JSON.stringify( monthlyCategories));
        renderRemainingAmount();
        // monthInput.value='';
        budgetInput.value='';
    }
    // thêm danh mục chi tiêu
    const btnPrimary = document.getElementById("btn-primary");
    btnPrimary.addEventListener("click",()=>{
        let inputName=document.getElementById("inputName");
        let inputLimit=document.getElementById("inputLimit");

        let monthValue=monthInput.value;
        let inputNameValue=inputName.value ;
        let inputLimitValue=Number(inputLimit.value);
        
        let isValid=true;
        inputName.style.border = "";
        inputLimit.style.border = "";
         monthInput.addEventListener("change", () => {
            monthInput.style.border = "";
            document.getElementById("checkMonth").style.display = "none";
        });

        if (!monthValue) {
            monthInput.style.border=" 1px solid red";
            document.getElementById("checkMonth").style.display="block";
            if (isValid) monthInput.focus();
            isValid=false;
            return;
        }
        let checkMonth=monthlyCategories.find(m=>m.month===monthValue && m.userId===currentUser.id);
        if (!checkMonth) {
            monthInput.style.border=" 1px solid red";
            document.getElementById("checkMonth").style.display="block";
            document.getElementById("checkMonth").innerText="Chưa có tháng này, Hãy thêm tháng này trước!!!";
            if (isValid) monthInput.focus();
            isValid=false;
            return;
        //     }else{
        //     renderCategories(checkMonth.categories);
         };

        if(!inputNameValue){
            inputName.focus();
            inputName.style.border="1px solid red ";
            isValid=false;
        };
        if (isNaN(inputLimitValue)|| inputLimitValue<=0) {
            inputLimit.style.border="1px solid red";
           if(isValid){
            inputLimit.focus();
           }
            isValid=false;
        };
        
  
        if (isValid) {
            if (editingId!==null) {
                let findIndex=checkMonth.categories.findIndex(ele=>ele.id===editingId);
                    if (findIndex!==-1) {
                        checkMonth.categories[findIndex].name=inputNameValue;
                        checkMonth.categories[findIndex].budget=inputLimitValue;
                        localStorage.setItem("monthlyCategories",JSON.stringify(monthlyCategories));
                        renderCategories(checkMonth.categories);
                        // renderRemainingAmount();
                         renderChoiceSpendingMoney ();
                        //  transactionsExceedingTheLimit();
                    }
            
                inputName.value = "";
                inputLimit.value = "";
                editingId = null;
                btnPrimary.innerText = "Thêm danh mục";
            } else {
                inputName.style.border=" 1px solid #d1d5db";
                inputLimit.style.border=" 1px solid #d1d5db";
                // them du lieu vao categories trong monthlyCategories
                checkMonth.categories.push({
                        id: checkMonth.categories.length===0? 1 : checkMonth.categories[checkMonth.categories.length-1].id+1,
                        categoryId: checkMonth.categories.length===0? 1 : checkMonth.categories[checkMonth.categories.length-1].id+1,
                        name: inputNameValue,
                        budget: inputLimitValue,
                });
                localStorage.setItem("monthlyCategories",JSON.stringify(monthlyCategories));
                renderCategories(checkMonth.categories);
                // renderRemainingAmount();
                 renderChoiceSpendingMoney ();
            }
            inputName.value = "";
            inputLimit.value = "";
        };
            
        });

        // reset

    // hiện số dư
    function renderRemainingAmount() {
        let remainingAmount=document.getElementById("remainingAmount");
        let monthValue=monthInput.value;
        let findMonth=monthlyCategories.find(m=>m.month === monthValue && m.userId===currentUser.id);
        let findTransactions = transactions.filter(m=>m.monthlyCategoryId === monthValue && m.userId===currentUser.id);
        if (findMonth) {
            let totalBudget= Number(findMonth.totalBudget);
            let totalUser= findTransactions.reduce((sum,item)=>{return sum + item.total},0);
            let remaining =totalBudget-totalUser;
            // remainingAmount.innerText=remaining.toLocaleString("vi-vn");
            if (remaining<0) {
                remainingAmount.innerText=remaining.toLocaleString("vi-vn") + " VND";
                remainingAmount.style.color = "red";
            } else {
                remainingAmount.innerText=remaining.toLocaleString("vi-vn") + " VND";
                remainingAmount.style.color = "green";
            };
        } else{
            remainingAmount.innerText=  "0 VND";
            remainingAmount.style.color = "black";
        }
};

// su kien doi thang
    monthInput.addEventListener("change", () => {
        document.getElementById("checkMonth").innerText='';
        document.getElementById("checkMonth").style.display="none";
        monthInput.style.border="";

        let findMonth=monthlyCategories.find(ele=>ele.month===monthInput.value && ele.userId===currentUser.id);
    
        if (findMonth) {
            renderCategories(findMonth.categories);
            renderRemainingAmount();
            renderHistorTransaction();
            renderChoiceSpendingMoney ();
            // transactionsExceedingTheLimit() ;
        } else{
            document.getElementById("listCategories").innerHTML="";
            monthInput.style.border="1px solid red";
            document.getElementById("checkMonth").style.display="block";
            document.getElementById("checkMonth").innerText="Chưa có tháng này!"
             renderRemainingAmount();
             renderHistorTransaction(); 
            renderChoiceSpendingMoney();
        //    transactionsExceedingTheLimit();
        };
        

    });
    
    // hiển thị lựa chọn danh mục
    function renderChoiceCategories(categories) {
        let selectInputName=document.getElementById("inputName");
    
        selectInputName.innerHTML = `
        <option value="" disabled selected>Chọn danh mục</option>
    `;
        categories.forEach(ele=>{
            selectInputName.innerHTML+=`
                <option value="${ele.name}">${ele.name}</option>
            `
        });
    };
    document.addEventListener("DOMContentLoaded",()=>{
        renderChoiceCategories(categories);
    });

    // hien thi lua chon loai giao dich
    function renderChoiceSpendingMoney (){
        let selectSpendingMoney=document.getElementById("spendingMoney");
        let monthValue=monthInput.value;
        selectSpendingMoney.innerHTML = `
        <option value="" disabled selected>Chọn danh mục</option>
    `;  
        let foundMonth=monthlyCategories.find(ele=>ele.month===monthInput.value && ele.userId===currentUser.id);
        // console.log(foundMonth);
        if(foundMonth && foundMonth.categories)
        foundMonth.categories.forEach(ele=>{
            selectSpendingMoney.innerHTML+=`
                <option value="${ele.name}">${ele.name}</option>
            `
        });
    };

    // hien thi danh muc

    function renderCategories(list) {
        let listCategories=document.getElementById("listCategories");
        listCategories.innerHTML='';

       list.forEach(ele=>{
            listCategories.innerHTML+=`
           <li class="card2">
                    <div class="icon-box">$</div>

                    <div class="info">
                        <div class="title">${ele.name}</div>
                        <div class="amount">${Number(ele.budget).toLocaleString("vi-VN")} VNĐ</div>
                    </div>

                    <div class="actions">
                        <svg onclick="btnDelete(${ele.id})" 
                            class="action-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /> 
                        </svg>
                        
                        <svg onclick="btnUpdate(${ele.id})" 
                            class="action-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </div>
                </li>
            `
        });
    };
   
// xóa danh mục chi tiêu
    let deleteId=null;

    function btnDelete(id) {   
        deleteId=id;     
        let confirmDeletion =document.getElementById("confirmDeletion");
        confirmDeletion.style.display="flex"; 
    };
    function cancelDelete() {
        document.getElementById("confirmDeletion").style.display="none";
        }
    function deleteCategory() {
            let foundMonth = monthlyCategories.find(ele=>ele.month===monthInput.value&& ele.userId===currentUser.id);
            if (foundMonth) {
                let findCategores=foundMonth.categories.findIndex(ele=>ele.id===deleteId);
                    if (findCategores!==-1) {
                        foundMonth.categories.splice(findCategores,1);
                        localStorage.setItem("monthlyCategories",JSON.stringify(monthlyCategories));
                        // renderRemainingAmount();
                        renderCategories(foundMonth.categories);
                         renderChoiceSpendingMoney ();
                    }
            }   
            document.getElementById("confirmDeletion").style.display = "none";
            deleteId = null;       
        };
    

    
    // sửa danh mục
    function btnUpdate(id) {
        let inputName=document.getElementById("inputName");
        let inputLimit=document.getElementById("inputLimit");

        for (let i = 0; i < monthlyCategories.length; i++) {
            if (monthlyCategories[i].userId === currentUser.id && monthlyCategories[i].month===monthInput.value) {
                let findId = monthlyCategories[i].categories.findIndex(ele => ele.id === id);
                if (findId !== -1) {
                    inputName.value = monthlyCategories[i].categories[findId].name;
                    inputLimit.value = monthlyCategories[i].categories[findId].budget;
                    editingId = id;
                    btnPrimary.innerText = "Cập nhật";
                    inputName.focus();
                    inputLimit.focus();
                    break;
                };
            };
        };
    }

    // change info
    function changeInfomation() {
        document.getElementById("modal-overlay").style.display = "flex";
     }
    // đóng thông tin
    function closeInformation() {
        document.getElementById("modal-overlay").style.display = "none";
    }
    // hiển thị thông tin người dùng và thay đổi
        let nameInput = document.getElementById("nameInfor");
        let emailInput = document.getElementById("emailInfor");
        let phoneInput = document.getElementById("phoneInfor");
        let genderInput = document.getElementById("genderInfor");
    function renderChangerInformation() {
        nameInput.value = currentUser.fullName || "Chưa cập nhật";
        emailInput.value = currentUser.email || "Chưa cập nhật";
        phoneInput.value = currentUser.phone || "Chưa cập nhật";
        currentUser.gender===true?genderInput.value="male": genderInput.value="female";    
    }
    renderChangerInformation();

    function saveChangeInformation() {
        let nameValue=nameInput.value.trim();
        let emailValue=emailInput.value.trim();
        let phoneValue=phoneInput.value.trim();
        let genderValue=genderInput.value;

        let checkName=document.getElementById("checkName");
        let checkEmail=document.getElementById("checkEmail");
        let checkPhone=document.getElementById("checkPhone");
        let isValid=true;
        nameInput.style.border = "";
        emailInput.style.border = "";
        phoneInput.style.border = "";


        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;

        if (nameValue==="") {
            nameInput.style.border="1px solid red";
            checkName.innerHTML="Tên không được để trống";
            isValid=false;
        }

        if (emailValue==="") {
            emailInput.style.border="1px solid red";
            checkEmail.innerHTML = "Email không được để trống";
            if(isValid){emailInput.focus()};
            isValid=false;
        } else if(!emailRegex.test(emailValue)){
            emailInput.style.border="1px solid red";
            checkEmail.innerHTML = "Email không đúng định dạng";
            if(isValid){emailInput.focus()};
            isValid=false;
        } else{
             let duplicateEmails = users.find(ele=>ele.email===emailValue&& ele.id !== currentUser.id);
                if (duplicateEmails) {
                    emailInput.style.border="1px solid red";
                    checkEmail.innerHTML = "Email này đã được sử dụng";
                    if(isValid){emailInput.focus()};
                    isValid=false;
                } 
        }
       

        if (phoneValue===""|| !phoneRegex.test(phoneValue)) {
            phoneInput.style.border="1px solid red";
            if(isValid){phoneInput.focus()};
            isValid=false;
        } else{
            let duplicatePhone=users.find(ele=>ele.phone===phoneValue && ele.id !==currentUser.id);
                if (duplicatePhone) {
                    phoneInput.style.border="1px solid red";
                    checkPhone.innerHTML = "Số điện thoại này đã được sử dụng";
                    if(isValid){phoneInput.focus()};
                    isValid=false;
                };
        }
       
        if (isValid) {
            currentUser.fullName=nameValue;
            currentUser.email=emailValue;
            currentUser.phone=phoneValue;
            currentUser.gender = (genderValue === "male" ? true : false);
            alert("Change Information Successfull !");

            let userIndex=users.findIndex(ele=>ele.id===currentUser.id);
            if (userIndex!==-1) {
                users[userIndex].fullName=currentUser.fullName;
                users[userIndex].email=currentUser.email;
                users[userIndex].phone=currentUser.phone;
                users[userIndex].gender=currentUser.gender;
            } ;

            localStorage.setItem("currentUser",JSON.stringify(currentUser));
            localStorage.setItem("users",JSON.stringify(users));
            closeInformation();
            renderInfomation();
        };
    }
    // hiện lịch sử và phân trang
     let currentPage=1;
     let limitPerPage=5;
     let currentDataList=[];
    function renderHistorTransaction(data=null) {
        let tableHead=document.getElementById("tableHead");
        tableHead.innerHTML=""
            tableHead.innerHTML=`
             <thead>
                <tr>
                    <th>STT</th>
                    <th>Category</th>
                    <th>Budget</th>
                    <th>Note</th>
                    <th class="text-center">Actions</th>
                </tr>
            </thead>`

        let tableBody=document.getElementById("tableBody");
        tableBody.innerHTML="";
        if (data!==null) {
            currentDataList=data;
        } else {
            currentDataList = transactions.filter(t => t.userId === currentUser.id && t.monthlyCategoryId===monthInput.value);
        }

        let totalPages=Math.ceil(currentDataList.length/limitPerPage);
        let start =(currentPage-1)* limitPerPage;
        let end= start+limitPerPage;
        let paginatedData = currentDataList.slice(start, end);

        paginatedData.forEach((ele,index) => {
            tableBody.innerHTML += `
            <tr>
                <td>${start + index+1}</td>
                <td>${ele.description}</td>
                <td>${Number(ele.total).toLocaleString("vi-VN")}</td>
                <td>${ele.note}</td>
                <td class="text-center">
                    <button class="btn-delete" title="Xóa" onclick="deleteTransactionAlert(${ele.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </td>
            </tr>
            `;
        });
        renderPagination(totalPages);
    }
    renderHistorTransaction();
    // theem gia dich
     let spendingMoney=document.getElementById("inputSpendingMoney");// sô tiền
    let spendingCategories =document.getElementById("spendingMoney");// loại
    spendingMoney.addEventListener("input",()=>{
        document.getElementById("inputSpendingMoney").style.border="";
        document.getElementById("transactionAlert").style.display="none";
    })
    spendingCategories.addEventListener("change",()=>{
        document.getElementById("spendingMoney").style.border = "";
    })
    function addTransaction() {
       
        let inputNote=document.getElementById("inputNote");
        let monthValue=monthInput.value;
        let isValid = true;
        let transactionAlert=document.getElementById("transactionAlert");

        let spendingMoneyValue = Number(spendingMoney.value);
        let spendingCategoriesValue =spendingCategories.value;
        let noteValue=inputNote.value;
        
        if (!monthValue) {
            monthInput.style.border=" 1px solid red";
            document.getElementById("checkMonth").style.display="block";
            if (isValid) monthInput.focus();
            isValid=false;
            return;
        }
        let checkMonth=monthlyCategories.find(m=>m.month===monthValue && m.userId===currentUser.id);
        if (!checkMonth) {
            monthInput.style.border=" 1px solid red";
            document.getElementById("checkMonth").style.display="block";
            document.getElementById("checkMonth").innerText="Chưa có tháng này, Hãy thêm tháng này trước!!!";
            if (isValid) monthInput.focus();
            isValid=false;
            return;
            } 
        if (spendingMoneyValue<=0 || isNaN(spendingMoneyValue)) {
            spendingMoney.style.border="1px solid red";
            transactionAlert.innerHTML="Số tiền không hợp lệ";
            transactionAlert.style.color="red"
            if(isValid){spendingMoney.focus();};
            isValid=false;
        };
        
        if (!spendingCategoriesValue) {
            spendingCategories.style.border = "1px solid red";
            if(isValid){spendingCategories.focus();};
            isValid = false;
        }
        if (noteValue==="") {
            noteValue="Chưa có ghi chú"
        }

        if (isValid) {
            let newTransaction={
                id: transactions.length===0? 1: transactions[transactions.length-1].id+1,
                userId:currentUser.id,
                total: spendingMoneyValue,
                description:spendingCategoriesValue,
                note:noteValue,
                monthlyCategoryId:monthValue,
                createdDate: new Date().toLocaleDateString('vi-VN')
            };
            transactions.push(newTransaction);
            localStorage.setItem("transactions", JSON.stringify(transactions));
            renderHistorTransaction();
            renderRemainingAmount();
            // transactionsExceedingTheLimit() ;
            spendingCategories.value='';
            spendingMoney.value='';
            inputNote.value='';
            transactionAlert.style.display='none';
            spendingCategories.style.border = "";
            spendingMoney.style.border="";

        }
    }
    // xóa chi tiêu'
    let idTransactions=null
    function deleteTransactionAlert(id) {
        let confirmDeleteTransactions =document.getElementById("confirmDeletionTransaction");
        confirmDeleteTransactions.style.display="flex"; 
        idTransactions=id;
    }
    function cancelDeleteTransaction() {
        document.getElementById("confirmDeletionTransaction").style.display="none";

    }
    function deleteTransaction() {
        let findIndex=transactions.findIndex(m=>m.id===idTransactions && m.userId===currentUser.id);
        if (findIndex!==-1) {
            transactions.splice(findIndex,1);
            localStorage.setItem("transactions",JSON.stringify(transactions));
            renderHistorTransaction();
            renderRemainingAmount();
            // transactionsExceedingTheLimit() ;
        };
        document.getElementById("confirmDeletionTransaction").style.display="none";
        idTransactions=null;

    }

    // tìm kiếm
    // Hàm  Tìm kiếm và Sắp xếp
        function filterAndSortTransactions() {
        let searchInput = document.getElementById("searchInput");
        let sortSelect = document.getElementById("sortSelect");
        
        let searchValue = searchInput.value.trim().toLowerCase();
        let sortValue = sortSelect.value;
        let monthValue = monthInput.value;

        if (!monthValue) {
            monthInput.style.border = "1px solid red";
            document.getElementById("checkMonth").style.display = "block";
            document.getElementById("checkMonth").innerText = "Hãy chọn tháng!";
            return;
        }

        let checkMonth = monthlyCategories.find(m => m.month === monthValue && m.userId === currentUser.id);
        if (!checkMonth) {
            monthInput.style.border = "1px solid red";
            document.getElementById("checkMonth").style.display = "block";
            document.getElementById("checkMonth").innerText = "Chưa có tháng này, Hãy thêm tháng này trước!!!";
            return;
        } 

        let processedData = transactions.filter(ele => 
            ele.userId === currentUser.id && 
            ele.monthlyCategoryId === monthValue &&
            ele.description.toLowerCase().includes(searchValue)
        );

        if (sortValue === "increasing") {
            processedData.sort((a, b) => a.total - b.total);
        } else if (sortValue === "decreasing") {
            processedData.sort((a, b) => b.total - a.total);
        }

        if (processedData.length > 0) {
            currentPage = 1; 
            renderHistorTransaction(processedData);
            document.getElementById("notFound").style.display = "none";
        } else {
            document.getElementById("notFound").style.display = "block";
            renderHistorTransaction([]);
        }
    }
    let searchInput = document.getElementById("searchInput");
    let sortSelect = document.getElementById("sortSelect");
    searchInput.addEventListener("input", filterAndSortTransactions);
    sortSelect.addEventListener("change", filterAndSortTransactions);

    // phân trang        

    // Hàm vẽ các nút phân trang
function renderPagination(totalPages) {
    const paginationContainer = document.querySelector('.pagination-container');
    
    // ẩn khi có 1 trang
    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
    }
    
    paginationContainer.style.display = 'flex'; 
    paginationContainer.innerHTML = '';

    // Nút trở lại
    let prevDisabled = currentPage === 1 ? 'disabled style="opacity: 0.5; pointer-events: none;"' : '';
    paginationContainer.innerHTML += `
        <button class="page-btn" ${prevDisabled} onclick="changePage(${currentPage - 1})">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
    `;

    // Các nút số trang
    for (let i = 1; i <= totalPages; i++) {
        let activeClass = i === currentPage ? 'active' : '';
        paginationContainer.innerHTML += `
            <button class="page-btn ${activeClass}" onclick="changePage(${i})">${i}</button>
        `;
    }

    // Nút Next
    let nextDisabled = currentPage === totalPages ? 'disabled style="opacity: 0.5; pointer-events: none;"' : '';
    paginationContainer.innerHTML += `
        <button class="page-btn" ${nextDisabled} onclick="changePage(${currentPage + 1})">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    `;
}

// Hàm chuyển trang khi click vào nút
function changePage(page) {
    currentPage = page;
    // Render lại bảng với mảng dữ liệu hiện tại 
    renderHistorTransaction(currentDataList); 
}

// hien giao dich vuot han muc
//     function renderTransactionsExceedingTheLimit(list) {
//         let div=document.getElementById("transactionsLimitContainer");
//         // div.innerHTML='';
//         list.forEach(ele=>{
//             div.innerHTML =`
//             <div class="transactionsLimit">
//                 <h4><svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M0 19H22L11 0L0 19ZM12 16H10V14H12V16ZM12 12H10V8H12V12Z" fill="#FA7800"/>
//                 </svg>
//                 Cảnh báo tài chính</h4>
//                 <p>️Danh mục "${ele.name}" đã vượt giới hạn ${ele.spent.toLocaleString("vi-VN")} /${ele.budget.toLocaleString("vi-VN")}</p>
//             </div>
//         `
//         })
    
//     }
// // tinhs toan fiao dich vuot han muc
// function transactionsExceedingTheLimit() {
//     let monthValue = monthInput.value;
//     let div = document.getElementById("transactionsLimitContainer");
    
//     let checkMonth=monthlyCategories.find(m=>m.month===monthValue && m.userId===currentUser.id);
//     let checkTransactions = transactions.filter(m=>m.monthlyCategoryId===monthInput.value && m.userId===currentUser.id);
    
//     if (!checkMonth || !checkMonth.categories) {
//         div.innerHTML = '';
//         return;
//     }
//     let exceedingCategories = []; // giao dich vuot ngan sach

//     checkMonth.categories.forEach(category => { // Sửa 'categories' thành 'category'
//     let categoryTransactions = checkTransactions.filter(t => t.description === category.name);
//     let totalSpent = categoryTransactions.reduce((sum, item) => sum + Number(item.total), 0); // Nên bọc Number() để tránh lỗi cộng chuỗi
    
//     if (Number(category.budget) < totalSpent) {
//         exceedingCategories.push({
//             name: category.name,
//             budget: category.budget,
//             spent: totalSpent
//         });
//     }
//     });
//     renderTransactionsExceedingTheLimit(exceedingCategories)
// }