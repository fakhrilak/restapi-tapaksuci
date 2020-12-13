exports.Stabilisasi=(data,kelas)=>{
    if(data.length === 8 || data.length === 16 || data.length === 4 || data.length === 32){
        return data
    }else if(data.length<4){
        if(data.length === 3){
             data.splice(1, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
        }
        return data      
    }
    else if(data.length<8){
        if(data.length === 6 ){
            data.splice(1, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(7, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
        }else if(data.length === 5){
            data.splice(1, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(5, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(7, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
        }else if(data.length === 7){
            data.splice(7, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
        }
        return data     
    }else if(data.length<16){
        if(data.length === 9){
            data.splice(1, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(5, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(7, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(9, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(11, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(13, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(15, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
        }else if(data.length === 10){
            data.splice(1, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(5, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(7, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(9, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(11, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(15, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
        }else if(data.length === 11){
            data.splice(1, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(5, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(7, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(9, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(15, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
        }else if(data.length === 12){
            data.splice(1, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(7, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(9, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(15, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
        }else if(data.length === 13){
            data.splice(1, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(9, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(15, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
        }else if(data.length === 14){
            data.splice(1, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
            data.splice(15, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
        }else if(data.length === 15){
            data.splice(15, 0,{ id: 0, nama: ' ', kelas: kelas, kontingen: '', nilai: 0 });
        }
        return data
    }else if(data.length < 32){

    }
}

exports.Strabilizelength=(data)=>{
    if(data.length < 4){
        return 4
    }else if(data.length < 8){
        return 8
    }else if(data.length < 16){
        return 16
    }else if(data.length <32){
        return 32
    }
}