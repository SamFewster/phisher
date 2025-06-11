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
        link: "https://micros0ft-security-checkup.com/login"
    }
]