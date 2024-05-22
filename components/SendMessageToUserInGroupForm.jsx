import { useState } from 'react';

export default function SendMessageToUserInGroupForm() {
  const [message, setMessage] = useState('Đang có capcha !');
  const [userId, setUserId] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(null);

    try {
      const res = await fetch('/api/sendMessageToUserInGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, userId }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: error.message });
    }
  };

  return (
    <div className='w-full h-screen flex items-center justify-center flex-col gap-4'>
      <h1 className='font-bold text-xl text-center'>Thông báo đến telegram</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="text"
          placeholder="Nhập username của bạn ..."
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          className='border text-center px-4 py-4 rounded-md border-dashed border-black w-[320px]'
        />
        <button className='bg-sky-600 hover:bg-red-500 duration-200 font-bold h-[60px] text-white py-2 rounded-md' type="submit">Thông báo</button>
        <input
          type="text"
          placeholder="Tác giả Lương Khoa"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled
          className='text-center'
        />
      </form>
      {response && (
        <div>
          {response.error ? (
            <p className='text-center'>Error: {response.error}</p>
          ) : (
            <p className='text-center'>Message sent: {JSON.stringify(response)}</p>
          )}
        </div>
      )}
    </div>
  );
}
