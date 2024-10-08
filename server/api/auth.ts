import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  const clientId = process.env.VK_CLIENT_ID; // Ваш VK Client ID
  const redirectUri = 'https://3000-idx-psmz-1727641875132.cluster-p6qcyjpiljdwusmrjxdspyb5m2.cloudworkstations.dev/soon'; // Ваш redirect URI

  const loginUrl = `https://oauth.vk.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email`;

  return { loginUrl };
});
