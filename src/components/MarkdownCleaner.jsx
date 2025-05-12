import { useState } from 'react';
import { marked } from 'marked';

export default function MarkdownCleaner() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleInputChange = (e) => {
    const text = e.target.value;
    cleanMarkdown(text);
    setInput(text);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result || '';
      cleanMarkdown(text.toString());
    };

    reader.readAsText(file);
  }

  const cleanMarkdown = (text) => {
    let cleaned = text.replace(/\[\^.*?\]/g, '');
    cleaned = cleaned.replace(/\[([^\]]+)\]\((.*?)\)/g, '$1');
    setOutput(marked.parse(cleaned));
  };

  return (
    <div>
        <div className='space-y-3 mb-8'>
            <label htmlFor="input">ข้อความ Markdown:</label>
            <textarea
                id="input"
                class="textarea textarea-md w-full" 
                placeholder="วางข้อความ Markdown ที่นี่..."
                value={input}
                onChange={handleInputChange}
            ></textarea>
        </div>

        <div className='space-y-3 mb-8 flex items-center gap-5'>
            <input type="file" className='file-input file-input-primary' accept=".md,.txt" onChange={handleFileChange} />
            <p style={{ fontSize: '0.9rem', color: '#666' }}>รองรับไฟล์ .md หรือ .txt</p>
        </div>

        <h3 className='text-2xl font-bold mb-3'>ผลลัพธ์ (Rendered Markdown):</h3>
        <hr className='mb-4' />
        <div class="markdown prose max-w-full" dangerouslySetInnerHTML={{ __html: output }}></div>
    </div>
  );
}
