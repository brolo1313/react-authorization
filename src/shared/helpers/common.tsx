  // Функція для декодування Base64Url
  const base64UrlDecode = (base64Url: string) => {
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(base64); // Декодування з Base64
    return JSON.parse(decoded); // Перетворення на об'єкт JSON
  };

  // Функція для парсингу JWT
  const parseJwt = (token: string) => {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }

    const payload = base64UrlDecode(parts[1]); // Витягуємо payload
    return payload;
  };

  export { base64UrlDecode, parseJwt };