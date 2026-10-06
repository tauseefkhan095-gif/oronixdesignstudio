export const STUDIO_EMAIL = "oronixdesign@gmail.com";
export type ContactInquiry = {
 id:string;name:string;email:string;company:string;service:string;budget:string;message:string;
};
// Provider acceptance is a submission receipt, not proof of inbox delivery.
export async function forwardContactInquiry(inquiry:ContactInquiry,siteUrl:string,transport:typeof fetch=fetch){
 const response=await transport(`https://formsubmit.co/ajax/${STUDIO_EMAIL}`,{
  method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},
  body:JSON.stringify({name:inquiry.name,email:inquiry.email,company:inquiry.company,service:inquiry.service,budget:inquiry.budget||"To be discussed",message:inquiry.message,inquiry_reference:inquiry.id,_subject:"New inquiry from the Oronix website",_url:new URL(siteUrl).href,_template:"table"}),
  signal:AbortSignal.timeout(20000)
 });
 if(!response.ok)throw new Error("Email submission was not accepted");
 const result:unknown=await response.json();
 if(!result||typeof result!=="object"||!("success" in result)||!(result.success===true||result.success==="true"))throw new Error("Email submission could not be confirmed");
 return {accepted:true as const};
}
