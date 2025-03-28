import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { google } from "googleapis";
import fs from 'fs-extra'
import path from 'path'
import Handlebars from 'handlebars'
import { formatPrice } from './formatOrderData.js'

dotenv.config()
const {
  EMAIL_OAUTH_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN,
  EMAIL_DIRSTORE,
} = process.env;

const oAuth2Client = new google.auth.OAuth2(
  EMAIL_OAUTH_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
console.log("aca esta el refresh")
//console.log(oAuth2Client)
// console.log(oAuth2Client.credentials)
// console.log(oAuth2Client.credentials.refresh_token)

Handlebars.registerHelper("formatPrice", function (price) {
  if (!price) return "---";
  const p = price.toString();
  let int = p.split(".")[0];
  if (int.length > 3) {
    int = int.slice(0, -3) + "." + int.slice(-3);
  }
  return int;
});

Handlebars.registerHelper("finalPrice", function (price, sale_price) {
  if (sale_price !== price && sale_price !== 0) {
    return formatPrice(sale_price).int.toString();
  } else {
    return formatPrice(price).int.toString();
  }
});

Handlebars.registerHelper("getFinalPrice", function (price, discount) {
  if (discount === 0) {
    return formatPrice(price).int.toString();
  } else {
    return formatPrice(((100 - discount) * price) / 100).int.toString();
  }
});

Handlebars.registerHelper("quantity", function (quantity) {
  if (quantity > 1) {
    return quantity + "x";
  }
});

const sendEmail = async (email, subject, templateUrl, variables) => {
  try {
    const filePath = path.join(process.cwd(), "files", templateUrl);
    console.log("ya esta en el filepath")
    
    const source = fs.readFileSync(filePath, "utf-8").toString();
  
    console.log("Esta en el sendEmail")
 
    const template = Handlebars.compile(source);
    const html = template(variables);
    
    console.log("entro al accsestoken del mail")
    const accessToken = await oAuth2Client.getAccessToken();
    console.log(accessToken)
    //console.log(await oAuth2Client.getAccessToken)
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: EMAIL_DIRSTORE,
        clientId: EMAIL_OAUTH_CLIENT_ID,
        clientSecret: EMAIL_CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    console.log(transport)
    const mailOptions = {
      from: `Dirstore <${EMAIL_DIRSTORE}>`,
      to: email,
      subject,
      html,
    };
    //console.log(mailOptions)
    console.log("llegamos")
    const result = await transport.sendMail(mailOptions);
    //console.log(result)
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export {
    sendEmail
}
