const darijaKeywords = ['salam', 'bghit', 'taman', 'ach', 'kayen', 'mzian', 'عفاك', 'شكرا', 'بغيت', 'فين'];
const arabicKeywords = ['سعر', 'توصيل', 'دفع', 'عطر', 'كم', 'مغرب', 'مرحبا', 'شكرا'];
const frenchKeywords = ['prix', 'livraison', 'parfum', 'commande', 'bonjour', 'merci', 'rose', 'oud'];
const englishKeywords = ['price', 'delivery', 'order', 'perfume', 'hello', 'thanks', 'shipping', 'package'];

export function detectLanguage(text: string) {
  const normalized = text.toLowerCase();

  if (darijaKeywords.some((keyword) => normalized.includes(keyword))) {
    return 'darija';
  }
  if (arabicKeywords.some((keyword) => normalized.includes(keyword))) {
    return 'arabic';
  }
  if (frenchKeywords.some((keyword) => normalized.includes(keyword))) {
    return 'french';
  }
  if (englishKeywords.some((keyword) => normalized.includes(keyword))) {
    return 'english';
  }
  return 'english';
}

export function formatHelpText(language: string) {
  switch (language) {
    case 'darija':
      return 'Salam! Ana Naghma chatbot, n9dar n3awnk b l3itr, t3rf 3la livraison, w ndir lik commande.';
    case 'arabic':
      return 'مرحباً! أنا مساعد نغمة، أساعدك في العطور، التسليم، والطلب.';
    case 'french':
      return 'Bonjour! Je suis l\u00e9l\u00e9gant assistant Naghma, je vous aide pour le parfum, la livraison et la commande.';
    default:
      return 'Hello! I am Naghma assistant, here to help with perfumes, delivery, and orders.';
  }
}
