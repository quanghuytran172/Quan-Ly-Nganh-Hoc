let storageKey = 'majorsData';
let data = JSON.parse(localStorage.getItem(storageKey));
let majors = [];
if(data){
    majors = data;
}


function render(majors){
    let table = document.getElementById('table-body');
    if(majors){
        let contentTable = majors.map(function(major,index){
            return `<tr data-id="${index}">
                <td>${index+1}</td>
                <td>${major.majorID}</td>
                <td>${major.vi_name}</td>
                <td>${major.en_name}</td>
                <td>${major.department}</td>
                <td>${major.dayCreate}</td>
                <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs editMajor" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="far fa-edit"></span>
                </span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs deleteMajor" ><i class="far fa-trash-alt"></i></button></p></td>
            </tr>`;
        })
        table.innerHTML = contentTable.join('');
    }
}
render(majors);

$(document).ready(function(){
    "use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  	});
    

    // xóa chuyên ngành
	$('.deleteMajor').on('click',function(e){
        let tr = $(this).closest('tr');
        let selectID = tr[0].children[1].textContent;
        let iArr = majors.findIndex(function(item,index){
            return item.majorID === selectID;
        })
        majors.splice(iArr,1);
        localStorage.setItem(storageKey,JSON.stringify(majors));
        tr.remove();
    })
    
    // Chỉnh sửa chuyên ngành
    $('.editMajor').on('click',function(e){
        
        let id = $(this).closest('tr').data('id');
        let oldMajor = majors[id].majorID;
        let oldVi = majors[id].vi_name;
        let oldEn = majors[id].en_name;
        let oldDepartment = majors[id].department;

        $('#majorId').attr('placeholder',oldMajor);
        $('#vi-name').attr('placeholder',oldVi);
        $('#en-name').attr('placeholder',oldEn);
        $('#department').attr('placeholder',oldDepartment);
        $('#updateForm').on('click',function(e){
            let majorId = $('#majorId').val();
            let vi_name = $('#vi-name').val();
            let en_name = $('#en-name').val();
            let department = $('#department').val();
            if(majorId === '' || vi_name === '' || en_name === '' || department ==='Choose...'){
                alert('Các trường không được bỏ trống...')
            }
            else{
                majors[id]['majorID'] = majorId;
                majors[id]['vi_name'] = vi_name;
                majors[id]['en_name'] = en_name;
                majors[id]['department'] = department;
                localStorage.setItem(storageKey,JSON.stringify(majors));
                window.location.href= 'danhsachnganh.html';
            }
        })        
    })
})

	

