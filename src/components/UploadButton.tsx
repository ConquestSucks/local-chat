import React from 'react'

const UploadButton = ({func} : { func: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div className="file-upload-container">
        <label htmlFor="file-upload" className="custom-file-upload">
            <span>+</span>
        </label>
        <input id="file-upload" type="file" onChange={func}/>
    </div>
  )
}

export default UploadButton