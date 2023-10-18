const badgeMap = new Map([
    [100, { name: 'NoviceArtisto', icon: 'https://www.yieldify.com/wp-content/uploads/2020/04/Trust_Badges_Icon-2.svg' }],
    [2, { name: 'ApprenticeSketcher', icon: 'https://i.pinimg.com/564x/11/5f/0a/115f0ac90dfc685ff3564a27cb9e11d1.jpg' }],
    [300, { name: 'MasterDoodler', icon: '../img/best-badge.png' }],
    [400, { name: 'ArtisticProdigy', icon: '../img/star-badge(2).png' }],
    [500, { name: 'GrandCartoonist', icon: '../img/star-badge(2).png' }],  // add more image url in future as of now just go with these 2 
]);


const assignBadge = (user_score) => {
    let badge;
    for (const [score, badgeInfo]  of badgeMap) {
         if(user_score  >= score){
            badge = badgeInfo;
         }
    }
    return badge;
}



export {assignBadge};