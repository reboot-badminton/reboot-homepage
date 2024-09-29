
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneCleanRegex = /[^0-9]/g;
const phoneRegex = /^(01[016789]|02|0[3-9][0-9])(\d{3,4})(\d{4})$/;

export default function validate(email: string, phone: string, password: string, confirmation: string) {
  // 이메일
  if (!emailRegex.test(email)) {
    throw new Error('Please enter a valid email address.');
  }

  // 전화번호
  const cleaned = phone.replace(phoneCleanRegex, '');
  const match = cleaned.match(phoneRegex);

  if (!match) {
    throw new Error('Please enter a valid phone number.');
  }

  // 비밀번호
  if (password !== confirmation) {
    throw new Error('Passwords don\'t match.');
  }
}
