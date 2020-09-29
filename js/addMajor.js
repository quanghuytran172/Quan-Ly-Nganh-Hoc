let storageKey = 'majorsData';
function getData(storageKey){
    let data = JSON.parse(localStorage.getItem(storageKey));
    return data;
}
$(document).ready(function(){
    // Thêm ngành học
    $('.add-form button[type="button"]').on('click',function(){
        let major ={};
        let majorId = $('#majorId').val();
        let vi_name = $('#vi-name').val();
        let en_name = $('#en-name').val();
        let department = $('#department').val();
        let cTime = new Date();
        let data = getData(storageKey);
        if(majorId === '' || vi_name === '' || en_name === '' || department ==='Choose...'){
            alert('Các trường không được bỏ trống...')
        }
        else{
            major['majorID'] = majorId;
            major['vi_name'] = vi_name;
            major['en_name'] = en_name;
            major['department'] = department;
            major['dayCreate'] = `${cTime.getDate()} / ${cTime.getMonth()+1} / ${cTime.getFullYear()}`;
            let majors = [];
            if (data){
                majors = data;
            }
            majors.push(major);
            localStorage.setItem(storageKey,JSON.stringify(majors));
            
            window.location.href= 'danhsachnganh.html';
        }
    })
        
})