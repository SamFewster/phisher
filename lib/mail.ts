import { EmailProps, NameProps } from "./types";

export function generateMailList(count: number, name: NameProps): EmailProps[] {
    if (count > EMAIL_LIST.length) {
        throw new Error("Not enough emails in the list");
    } else {
        const emails: EmailProps[] = sampleArray(EMAIL_LIST, count);

        for (let i = 0; i < emails.length; i++) {
            emails[i].content = emails[i].content.replace("{firstName}", name.firstName);
            emails[i].content = emails[i].content.replace("{lastName}", name.lastName);
        }
        return emails;
    }
}

export function sampleArray(arr: Array<any>, n: number) {
    const copy = [...arr];
    const result = [];

    for (let i = 0; i < n && copy.length > 0; i++) {
        const index = Math.floor(Math.random() * copy.length);
        result.push(copy.splice(index, 1)[0]);
    }

    return result;
}

export const EMAIL_LIST: EmailProps[] = [
    {
        title: "Immediate Action Required: Account Access Suspended",
        sender: "security-update@micros0ft-support.com",
        content: "Dear Valued Microsoft User,\n\nWe have detected unusual login activity on your Microsoft account from an unrecognized device. For your protection, we have temporarily suspended access.\n\nTo restore your account, please verify your identity within the next 12 hours to avoid permanent suspension.\n\nClick the link below to begin verification:\n\{link}\n\nFailure to complete verification will result in your account being permanently disabled.\n\nThank you for your prompt attention,\n\nMicrosoft Account Security Team\n\nDo not reply to this message. This is an automated system notification.",
        link: "https://micros0ft-security-checkup.com/login",
        scam: true
    },
    {
        title: "PAYMENT DUE!",
        sender: "bsc@leicester-gov.com",
        content: "Hi {firstName},\n\nYou are due to make payment to your council account, or you are going to be blocked by the council from accessing your account and information. Please go {link} to do this.\n\nThanks. (Leicester City Hall)",
        link: "https://www.leicester-gov.com/pay",
        scam: true
    },
    {
        title: "Congratulation!",
        sender: "citycouncilhr@gmail.com",
        content: "Hello,\n\nWe are emailing you to inform you that you are the best employee this month in your council! Because of this, you will get a £500 bonus on your pay.\n\nClick the link below to enter your banking information so we can send you this money.\n\n{link}\n\nThis reward expires 10 minutes after you open this email, because the council values worker efficiency. Respond quickly so you don't loose your hard-earned bonus!\n\nFrom,\nYour City Council",
        link: "https://www.c0uncilLE/luckybonus",
        scam: true
    },
    {
        title: "From dad",
        sender: "mrajh@outlook.com",
        content: "Hello son,\n\nMy phone isn't working and the car broken down on the side of the busy road. I am emailing from the laptop of a kind stranger who has stopped to help me. I know you are at work so I am emailing your city council email.\n\nCould you please send £50 to my breakdown recovery service so they can come and fix my car and I can go home. I need to get back, because I have left the dinner on the stove and no-one else is home!\n\nHere is the link: {link}\n\nFrom dad.",
        link: "https://www.AAAA.xyz/urgentbreakdownrecovery/support_your_loved_ones",
        scam: true
    },
    {
        title: "URGENT: Ransomware cyberattack",
        sender: "leicestercouncilsecurity@hotmail.com",
        content: "Dear Employee,\n\nThe council and all its constituents are under serious threat. We are facing a ransomware attack from notorious hackers. It is very important that you enter your council portal log in details to the link below immediately, so we can secure your account. If you do not, all off your work will be lost to the hackers. Do not try and log on to your account in a standard manner, as this will result in the hackers gaining access to your account.\n\nFill in your details at this link immediately: {link}",
        link: "https://www.leicesterconcil.xyz/secureyouracountduetoscammersplease",
        scam: true
    },
    {
        title: "Congratulations, you have been approved!!!",
        sender: "contactopr12@hotmail.com",
        content: "Hello {firstName}\n\nCongratulations, you have been selected for the position of council assistant managing director! We are thrilled to have you on our team. Now let's finalize the details of your hiring process and begin your journey with us. Visit the site below to complete the application.\n\n{link}\n\nFrom,\nThe Hiring department (Leicester county council)",
        link: "https://hgy783dhb8DBCU.space",
        scam: true
    },
    {
        title: "Congrats",
        sender: "tiptoe23@gmail.com",
        content: "Hi {firstName},\n\nWe have tried to contact you by phone and via SMS regarding the lottery you won last week.\n\nYou must access the website below to complete the required process for registration. If you are still interested in the award, kindly click {link} to finalize your application.\n\nFrom,\n\nKeisha Lionheart (county council office)",
        link: "https://www.smslotterywinners/notascam", 
        scam: true
    },
    {
        title: "NEW job offers",
        sender: "management@leicestergov.co.uk",
        content: "Morning all,\n\nThank you for your aplication.\n\nUpon reading cv we have found a great opportunity for you within the company.\n\nThis role offers will a higher pay with significantly less hours compared to your current job description.\n\nThis offer is only available to the end of the day so please click this link immediately to give your company log in detail and move forward with the next steps.\n\n{link}\n\nKind regards,\nPeter Soulsby",
        link: "https://leicestercounciljobapplication.com",
        scam: true
    },
    {
        title: "URGENT!",
        sender: "staff.admin@leicestergov.art",
        content: "Hello {firstName},\n\nI am sending this email to reminded you to fill in the form for the £500 lottery ticket you won as the best member of staff of the month.\n\nUse this forms link to do that: {link}\n\nThank you,\nLilo Stich (Head of Staff Administration)",
        link: "https://forms.office.com/e/CxnZggLuP",
        scam: true
    },
    {
        title: "DELIVERY - reschedule NOW",
        sender: "delivery@amazom.com",
        content: "Hello {firstName} {lastName},\n\nYour package failed to be delivered today at 17:60.\n\nTo receive your package, use this link to give your order details and address.\n\n{link}\n\nPlease note that all deliveries end in an hour.",
        link: "https://amazodeliverydelay.com",
        scam: true
    },
    {
        title: "Update on your McAfee support",
        sender: "mcafeesupportforcouncils@hotmail.co.uk",
        content: "To whom it may concern,\n\nWe regret to inform you that you Mcaffee support to protect you from cybersecurity attacks has expired. You are now at great risk of danger of your device being hacked into.\n\nLuckily, we have a solution! McAffee is offering our most loyal customers over 83% of a discount for full protection against malware and cybersecurity threats. This discount is supported by your organization, so can you please visit Mcaffe3support/renewADeal to enter your account information so we can register your devices for this package.\n\nHurry! This offer expires 2 hours from after your email is received from us.\n\n{link}\n\nI appreciate your co-operation,\nLenny from Mcafee support",
        link: "https://mcafeesupportforcouncils.space/claim",
        scam: true
    },
    {
        title: "CleanUpLeicester Project Meeting",
        sender: "rachel.smith@leicester.gov.uk",
        content: "Hi all,\n\nJust wanted to let you know that the CleanUpLeicester Project Meeting scheduled for this Friday has been moved to next Tuesday.\n\nJoin the meeting here:{link}\n\nPlease email me or another member of staff at the MIS office if this causes any timetabling issues.\n\nKind regards,\nRachel Smith\nManagement Information Systems\nLeicester County Council",
        link: "https://teams.microsoft.com/meeting/35791",
        scam: false
    },
    {
        title: "Lunch today",
        sender: "thomashillcatering@outlook.co.uk",
        content: "Good morning,\nHere is today's lunch menu:\n{link}\nEnjoy your lunch,\nEdward Smith\nThomas Hill Catering Services",
        link: "https://leicesteronline.gov/employees/lunch-menu",
        scam: false
    },
    {
        title: "Parking",
        sender: "sitestaff@leicester.gov.uk",
        content: "Good afternoon,\n\nIt has been brought to my attention that some members of staff at City Hall have been using the disabled parking spaces without having a blue badge.\n\nAs of next week, a parking warden will be checking valid for parking and valid blue badges in the City Hall car park. This will happen randomly one day each week.\n\nIf you are found to be parking in the Blue Badge parking spaces, your City Hall parking permit will be revoked, and you will not receive a refund.\n\nOur department has released a statement about this, which can be accessed on the news section in the council log in portal. It can also be accessed at this link:\n{link}\n\nThank you for respecting these rules,\nGianna Stoke\nDirector of the Leicester County Council Site Management Services",
        link: "https://www.leicestercitycouncil.gov.uk/news/parking",
        scam: false
    },
    {
        title: "Monthly review",
        sender: "sofie.william@leicester.gov.uk",
        content: "Morning {firstName} {lastName},\n\nI hope you are well. Your monthly review will take place this week.\n\nEmail me back with any available times for you.\n\nI have linked below my google calendar or you access it via teams to compare our schedules.\n\nHere is the link: {link}\n\nSee you soon,\nSofie William",
        link: "https://calendar.google.com/s/5Th7GgO",
        scam: false
    },
    {
        title: "Staff Working Times",
        sender: "rachel.smith@leicester.gov.uk",
        content: "Hi {firstName} {lastName},\n\nIt has been flagged on the system that you have been consistently arriving to meetings - both online and in person - between 2 and 5 minutes late. This is unacceptable as you are wasting the time of your colleagues and the council. Please correct this behaviour before further steps must be taken regarding your employment.\n\nIf you think this warning is unjust and the accusations made against you are false, please review your rights as an employee of the council at this link or find them in the terms of your contract.\n\nTo access future meeting dates, please refer to the following link: {link}\n\nKind Regards,\nRachel Smith\nManagement Information Systems\nLeicester County Council",
        link: "https://leicester.gov/employees/meetings",
        scam: false
    },
    {
        title: "Complaint about parking",
        sender: "alison.green@leicester.gov.uk",
        content: "Hello {firstName},\n\nHope you are well. I have noticed people accessing disabled parking places without owning a blue badge. This has been very disruptive to me and others who require the space.\n\nTo address this, I have written a formal complaint to the City Hall site managers and would appreciate if you did the same, so this issue is resolved soon.\n\nHere is the link to make the complaint or you can find it on the website.\n{link}\n\nThank you very much,\nAlison Green\nHuman resources\nCity Hall",
        link: "https://leicester.gov/council-complaints",
        scam: false
    },
    {
        title: "We can't process your payment",
        sender: "support@spotify.com",
        content: "Hi {firstName} {lastName},\n\nWe're having some trouble collecting your Spotify Premium payment. Please take a moment to review your payment details and double-check that there is money in your associated account. No rush - we'll try to process the payment again in a few days. Go to {link} and confirm the payment or do this through the account section on your mobile device.",
        link: "https://account.spotify.com",
        scam: false
    },
    {
        title: "Oadby Recycling Collection Schedules",
        sender: "saharjohnson@leicester.gov.uk",
        content: "Hi {firstName} {lastName},\n\nAs of the first Monday of next month, the recycling collection schedules for the Oadby district is changing. This is to address staff complaints regarding the distribution of working hours throughout the week.\n\nAs of the date above, recycling collection group 1C will now be completing the shift on Thursday at 9:00 am, and group 4B will be taking their Tuesday 3:00pm shift.\n\nYou can access the new timetable by logging into the portal and navigating to the documents section. This can be found here:\n{link}\n\nPlease feel free to contact me if there are any queries or concerns regarding the new timetable.\n\nMany thanks,\nSahar Johnson\nRecycling Collection Manager\nLeicester County Council",
        link: "https://leicester.gov.uk/countycouncil/staffportal/documents",
        scam: false
    }
]