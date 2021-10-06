export default (message:any,id:string)=>{
    let role = message.guild.roles.cache.find((r:any) => r.id === id);
    message.member.roles.add(role);
}