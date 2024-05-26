import React, { useState, useEffect } from 'react';

const Ipfs = () => {
    const [files, setFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState('');

    const fetchFiles = async () => {
        try {
            const response = await fetch('/api/ipfs');
            const files = await response.json();
            setFiles(files);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        const selectedFiles = event.target.files;
        
        if (!selectedFiles.length) {
            setUploadStatus('Please select files to upload');
            return;
          }

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('recfiles', selectedFiles[i]);
        }
        console.log(formData);
        try {
            const response = await fetch('/api/ipfs', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            setUploadStatus('Files uploaded successfully');
            console.log(result);
            fetchFiles();
        } catch (error) {
            console.error('Error uploading files:', error);
            setUploadStatus('Error uploading files');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Upload and Fetch Files</h1>

            <h2 className="text-xl font-semibold mb-2">Upload Files</h2>
            <form id="upload-form" className="mb-4" onSubmit={handleUpload}>
                <input
                    type="file"
                    id="files"
                    name="recfiles"
                    multiple
                    required
                    className="border p-2 mb-2 w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Upload
                </button>
            </form>
            <p id="upload-status" className="mb-4 text-green-500">
                {uploadStatus}
            </p>

            <h2 className="text-xl font-semibold mb-2">Uploaded Files</h2>
            <div id="file-list" className="space-y-2">
                {files.map((file) => (
                    <div key={file.filename} className="border p-2">
                        <a
                            href={`api/ipfs/${file.filename}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                        >
                            Download {file.filename}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ipfs;
