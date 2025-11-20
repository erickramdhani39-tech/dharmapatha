-- Add content field to career_guides table for full article content
ALTER TABLE public.career_guides 
ADD COLUMN content TEXT;

-- Add content to existing articles
UPDATE public.career_guides 
SET content = 'Pindah karier memang terasa menakutkan, tapi dengan persiapan yang tepat, kamu bisa melakukannya dengan percaya diri. Berikut langkah-langkah yang bisa kamu ikuti:

## 1. Identifikasi Alasan Pindah Karier
Mulai dengan menuliskan alasan mengapa kamu ingin pindah karier. Apakah karena passion, gaji, work-life balance, atau kesempatan berkembang? Memahami motivasi akan membantu kamu tetap fokus saat proses transisi.

## 2. Riset Industri dan Posisi Target
Pelajari industri baru yang kamu tuju. Baca artikel, ikuti webinar, dan berbicara dengan orang-orang yang sudah bekerja di bidang tersebut. Pahami skill apa yang dibutuhkan dan bagaimana prospek kariernya.

## 3. Audit Skill yang Dimiliki
Buat daftar semua skill dan pengalaman yang kamu miliki. Identifikasi mana yang bisa ditransfer ke karier baru dan mana yang perlu dipelajari dari awal.

## 4. Mulai Belajar Skill Baru
Manfaatkan platform online seperti Coursera, Udemy, atau YouTube untuk belajar skill baru. Fokus pada skill yang paling dibutuhkan di industri target.

## 5. Bangun Portofolio
Mulai mengerjakan proyek kecil untuk membangun portofolio. Ini bisa berupa proyek pribadi, freelance, atau volunteer work.

## 6. Network di Industri Baru
Hadiri meetup, join komunitas online, dan connect dengan profesional di industri target. Network adalah kunci untuk membuka peluang.

## 7. Update CV dan LinkedIn
Sesuaikan CV dan profil LinkedIn kamu untuk highlight skill dan pengalaman yang relevan dengan karier baru.

## Kesimpulan
Pindah karier membutuhkan waktu dan usaha, tapi dengan langkah-langkah yang tepat, kamu bisa melakukannya dengan sukses!'
WHERE id = 151;

UPDATE public.career_guides 
SET content = 'Saat pindah karier, portofolio adalah bukti nyata bahwa kamu memiliki skill yang dibutuhkan. Berikut cara membangun portofolio yang meyakinkan:

## 1. Identifikasi Skill yang Dibutuhkan
Pertama, pahami skill apa yang dicari oleh employer di industri target. Lalu buat proyek yang showcase skill tersebut.

## 2. Leverage Pengalaman Sebelumnya
Cari cara untuk mengaitkan pengalaman kerja sebelumnya dengan skill baru. Misalnya, jika kamu dari sales dan ingin jadi product manager, tunjukkan bagaimana kamu memahami customer needs.

## 3. Buat Proyek Personal
Jangan tunggu dapat klien untuk mulai. Buat proyek personal yang menunjukkan kemampuanmu. Misalnya:
- Developer: buat aplikasi atau website
- Designer: redesign UI/UX dari produk terkenal
- Writer: mulai blog atau contribute ke publikasi

## 4. Dokumentasikan Proses
Jangan hanya tunjukkan hasil akhir. Dokumentasikan proses thinking, challenges yang dihadapi, dan bagaimana kamu solve problems.

## 5. Showcase Hasil Terukur
Kalau memungkinkan, tunjukkan impact dari proyekmu. Misalnya: "Meningkatkan conversion rate 20%" atau "Mengurangi loading time 50%".

## 6. Buat Portfolio Website
Kumpulkan semua project di satu tempat yang mudah diakses. Pastikan websitenya clean, profesional, dan mobile-friendly.

## Kesimpulan
Portofolio yang kuat bisa mengatasi kurangnya pengalaman formal di industri baru. Focus pada quality over quantity!'
WHERE id = 152;

UPDATE public.career_guides 
SET content = 'Belajar skill baru saat sudah bekerja memang challenging. Berikut strategi untuk belajar secara efisien:

## 1. Set Learning Goals yang Spesifik
Jangan cuma bilang "mau belajar programming". Lebih spesifik: "Mau bisa bikin website dengan React dalam 3 bulan".

## 2. Buat Learning Schedule
Alokasikan waktu khusus untuk belajar. Misalnya 1-2 jam setiap hari atau 4-6 jam di weekend. Konsistensi lebih penting dari durasi.

## 3. Pilih Learning Path yang Terstruktur
Gunakan platform seperti:
- Coursera atau Udemy untuk course terstruktur
- freeCodeCamp atau The Odin Project untuk programming
- YouTube untuk tutorial spesifik

## 4. Practice by Building
Jangan cuma nonton tutorial. Langsung practice dengan bikin project sendiri. Learning by doing jauh lebih efektif.

## 5. Join Study Group atau Community
Belajar bareng membuat prosesnya lebih fun dan sustainable. Join Discord, Telegram group, atau meetup.

## 6. Fokus pada Fundamentals Dulu
Jangan loncat-loncat ke tools atau framework terbaru. Master fundamental concepts dulu, karena itu yang bertahan lama.

## 7. Track Progress
Catat apa yang sudah dipelajari dan milestone yang dicapai. Ini membantu maintain motivation.

## Kesimpulan
Belajar skill baru butuh strategi dan konsistensi. Focus on fundamentals, practice consistently, dan join community untuk support!'
WHERE id = 153;

UPDATE public.career_guides 
SET content = 'Mindset adalah faktor penting yang sering diabaikan saat pindah profesi. Berikut mindset yang perlu kamu develop:

## 1. Growth Mindset
Percaya bahwa skill bisa dipelajari. Jangan bilang "Aku nggak berbakat", tapi "Aku belum bisa, tapi aku akan belajar".

## 2. Embrace Being a Beginner
Terima bahwa kamu akan kembali jadi pemula. Ini normal dan temporary. Everyone starts somewhere.

## 3. Long-term Thinking
Pindah karier adalah marathon, bukan sprint. Jangan expect hasil instant. Focus on consistent progress.

## 4. Celebrate Small Wins
Setiap progress, sekecil apapun, adalah achievement. Finished tutorial? That''s a win. Made your first project? Another win.

## 5. Learn from Rejection
Rejection adalah bagian dari proses. Setiap rejection adalah learning opportunity. Ask for feedback dan improve.

## 6. Stay Curious
Maintain rasa ingin tahu. Keep asking questions, exploring new things, dan learning from others.

## 7. Build Resilience
Akan ada saat-saat sulit dan pengen give up. Punya support system dan reminder why you started sangat penting.

## 8. Be Patient with Yourself
Jangan compare your chapter 1 dengan chapter 20 orang lain. Everyone has their own timeline.

## Kesimpulan
Mindset yang tepat akan carry you through challenges dalam career transition. Focus on growth, be patient, dan enjoy the journey!'
WHERE id = 154;

UPDATE public.career_guides 
SET content = 'Networking adalah salah satu cara tercepat untuk masuk ke industri baru. Berikut cara membangun relasi yang efektif:

## 1. Identifikasi Orang yang Tepat
Cari profesional di posisi atau perusahaan yang kamu tuju. Gunakan LinkedIn untuk research dan connect.

## 2. Provide Value First
Jangan langsung minta bantuan. Mulai dengan memberikan value: share artikel yang relevan, comment on their posts, atau offer help.

## 3. Attend Industry Events
Ikut meetup, conference, atau workshop di industri target. Ini cara paling natural untuk ketemu orang baru.

## 4. Join Online Communities
Bergabung dengan Discord, Slack, atau Telegram groups yang relevan. Aktif participate dan share knowledge.

## 5. Informational Interviews
Reach out untuk coffee chat atau video call. Kebanyakan orang senang sharing pengalaman mereka. Prepare questions yang thoughtful.

## 6. Leverage Existing Network
Tanya teman atau keluarga apakah mereka kenal orang di industri target. Warm introduction selalu lebih efektif.

## 7. Be Genuine and Authentic
People can sense kalau kamu cuma manfaatin mereka. Build real connections, bukan transactional relationships.

## 8. Follow Up and Stay in Touch
After meeting someone, follow up dengan thank you message. Stay in touch occasionally tanpa always asking for something.

## 9. Give Before You Get
Help others in the community. Answer questions, share resources, mentor juniors. Karma works.

## Kesimpulan
Networking bukan tentang collecting contacts, tapi building genuine relationships. Be helpful, stay consistent, dan opportunities will come!'
WHERE id = 155;