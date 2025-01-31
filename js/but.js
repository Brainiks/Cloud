


async function handleFileUpload(event) {
  const file = event.target.files[0]; // Получаем выбранный файл
  if (!file) {
      alert("Файл не выбран.");
      return;
  }

  const formData = new FormData(); // Создаем объект FormData
  formData.append('file', file); // Добавляем файл в FormData

  try {
      // Отправляем файл на сервер
      const response = await fetch('http://localhost:8000/upload/', {
          method: 'POST',
          body: formData,
      });

      // Обрабатываем ответ от сервера
      if (response.ok) {
          const data = await response.json();
          alert(`Файл успешно загружен!\nИмя файла: ${data.filename}\nРазмер: ${data.size} байт`);
      } else {
          const errorData = await response.json();
          alert(`Ошибка: ${errorData.detail}`);
      }
  } catch (error) {
      alert(`Ошибка сети: ${error.message}`);
  }
}


// Функция для загрузки списка файлов с сервера
async function loadFiles() {
    try {
        const response = await fetch('http://localhost:8000/files/');
        if (response.ok) {
            const data = await response.json();
            const fileGridDiv = document.getElementById('fileGrid');
            fileGridDiv.innerHTML = ''; // Очищаем содержимое

            if (data.files.length === 0) {
                fileGridDiv.innerHTML = '<p>Нет доступных файлов.</p>';
            } else {
                data.files.forEach(file => {
                    const fileItem = document.createElement('div');
                    fileItem.className = 'file-item';

                    // Добавляем чекбокс
                    fileItem.innerHTML = `<input type="checkbox" class="file-checkbox" data-filename="${file.filename}">`;

                    // Определяем тип файла
                    const isImage = file.filename.match(/\.(jpg|jpeg|png|gif|bmp)$/i);
                    if (isImage) {
                        // Если это изображение, показываем превью
                        fileItem.innerHTML += `
                            <img src="http://localhost:8000/file/${file.filename}" alt="${file.filename}">
                            <p>${file.filename}</p>
                        `;
                    } else {
                        // Для других типов файлов используем иконку
                        fileItem.innerHTML += `
                            <i class="file-icon">📄</i>
                            <p>${file.filename}</p>
                        `;
                    }

                    fileGridDiv.appendChild(fileItem);
                });
            }
        } else {
            const errorData = await response.json();
            alert(`Ошибка: ${errorData.detail}`);
        }
    } catch (error) {
        alert(`Ошибка сети: ${error.message}`);
    }
}

// Функция для скачивания выбранных файлов
async function downloadSelectedFiles() {
    const checkboxes = document.querySelectorAll('.file-checkbox:checked');
    if (checkboxes.length === 0) {
        alert("Выберите хотя бы один файл для скачивания.");
        return;
    }

    for (const checkbox of checkboxes) {
        const filename = checkbox.getAttribute('data-filename');
        const link = document.createElement('a');
        link.href = `http://localhost:8000/file/${filename}`;
        link.download = filename;
        link.click();

        // Добавляем задержку между скачиваниями (опционально)
        await new Promise(resolve => setTimeout(resolve, 500)); // 500 мс
    }
}

// Загружаем список файлов при загрузке страницы
window.onload = loadFiles;

