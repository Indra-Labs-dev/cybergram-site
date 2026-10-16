interface LaunchEmailOptions {
  appUrl: string;
  unsubscribeUrl: string;
}

export function createLaunchEmail({ appUrl, unsubscribeUrl }: LaunchEmailOptions) {
  return {
    subject: "CyberGram est ouvert !",
    html: `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <title>CyberGram est ouvert</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f1f5f4;font-family:Arial,Helvetica,sans-serif;color:#17211f;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">La plateforme CyberGram est maintenant accessible.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f1f5f4;padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #dce7e4;border-radius:16px;overflow:hidden;">
          <tr><td style="padding:28px 36px;background:#06090b;border-bottom:4px solid #2fe6b8;">
            <p style="margin:0;color:#2fe6b8;font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">CyberGram</p>
          </td></tr>
          <tr><td style="padding:40px 36px 24px;">
            <p style="margin:0 0 12px;color:#178d70;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">C’est parti</p>
            <h1 style="margin:0 0 18px;color:#101816;font-size:30px;line-height:1.2;">CyberGram est ouvert&nbsp;!</h1>
            <p style="margin:0 0 16px;color:#42514d;font-size:16px;line-height:1.7;">La plateforme est maintenant accessible. Vous pouvez rejoindre l’espace CyberGram et commencer à explorer ses ressources dédiées à la cybersécurité.</p>
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:28px 0 22px;">
              <tr><td align="center" bgcolor="#2fe6b8" style="border-radius:8px;">
                <a href="${appUrl}" style="display:inline-block;padding:15px 24px;color:#04110d;font-size:15px;font-weight:700;text-decoration:none;">Accéder à CyberGram&nbsp; →</a>
              </td></tr>
            </table>
            <p style="margin:0;color:#66736f;font-size:14px;line-height:1.6;">Merci d’avoir suivi le lancement. À bientôt sur CyberGram&nbsp;!</p>
          </td></tr>
          <tr><td style="padding:22px 36px;background:#f7faf9;border-top:1px solid #e4ece9;">
            <p style="margin:0 0 8px;color:#687571;font-size:12px;line-height:1.6;">Vous recevez ce message parce que vous vous êtes inscrit·e à la liste d’attente CyberGram.</p>
            <p style="margin:0;color:#687571;font-size:12px;line-height:1.6;"><a href="${unsubscribeUrl}" style="color:#178d70;text-decoration:underline;">Se désinscrire de la liste</a></p>
          </td></tr>
        </table>
        <p style="margin:18px 0 0;color:#82908b;font-size:11px;line-height:1.5;">© CyberGram · <a href="https://cybergram.dev" style="color:#687571;">cybergram.dev</a></p>
      </td></tr>
    </table>
  </body>
</html>`,
    text: `CyberGram est ouvert !\n\nLa plateforme est maintenant accessible. Vous pouvez rejoindre l’espace CyberGram et commencer à explorer ses ressources dédiées à la cybersécurité.\n\nAccéder à CyberGram : ${appUrl}\n\nVous recevez ce message parce que vous vous êtes inscrit·e à la liste d’attente CyberGram.\nSe désinscrire : ${unsubscribeUrl}`,
  };
}
