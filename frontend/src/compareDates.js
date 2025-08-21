export function compareDates(d1, d2){
    let date1 = d1.date.split('/');
    let date2 = d2.date.split('/');

    for(let i = 0; i < 3; i++) date1[i] = Number(date1[i]);
    for(let i = 0; i < 3; i++) date2[i] = Number(date2[i]); 

    if(date2[2] == date1[2]){
        if(date2[1] == date1[1])  return date2[0] - date1[0];
        return date2[1] - date1[1];
    }
    return date2[2] - date1[2];


}
