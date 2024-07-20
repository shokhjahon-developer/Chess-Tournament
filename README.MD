# Chess Tournament Management System

## Setup Instructions

1. Install dependencies:
    
    npm install
   

2. Set up environment variables:

     .env.example => .env
   

3. Run the application:
   
  -- npm start
    

4. API Documentation:
   -- Dokumentatsiyani Postmanda qildim va u Documentaion file ichida. (Dokumentatsiyani Postmanda Import qilinsa hammasi tayyor)

5. Admin Login.
   -- Bitta default admin qo'shib qo'ydim.

   email: shomirzayevshokhjahon@gmail.com
   password: adminpassword22

## Features
- MongoDB URI ni tekshirish uchun qulaylik tug'dirishi uchun .env.example da qoldirdim (vazifa tekshirib bo'lingandan keyin gitHub dan bu ma'lumotlani o'chiraman).
- User uchun login\register qildim va email verification ham qo'shdim(cookies dan foydalanildi).
- Verify qilayotganda kelgan code ni tasdiqlash uchun Redis dan foydalandim, alohida yana db ochmasdan.
- Player Managemant uchun CRUD qilindi.
- Tournament Management uchun CRUD qilindi.
- Match Management uchun CRUD qilindi va pairing avtomatik tarzda bo'ladi.
- Leaderboard Tournament ichiga qo'shildi, tournamentda qatnashayotgan player lar uchun leaderboard chiqazib beradi.
- Eng muhimi hammasi ishlamoqda va Etilgan hamma vazifalar bajarilgan.



