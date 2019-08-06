import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const UPLOAD_PORTAL_IMAGE = gql`
  mutation uploadPortalImage(
    $language: String
    $title: String!
    $description: String
    $alt: String!
    $keyword: [String]
    $collection: String
    $file: Upload!
  ) {
    uploadPortalImage(
      language: $language
      title: $title
      description: $description
      alt: $alt
      keyword: $keyword
      collection: $collection
      file: $file
    ) {
      id
      data {
        languageId
        languageName
        title
        alt
        description
      }
      keyWords
      url
      resizer
      date
      listAvailableSizes
    }
  }
`

const Upload = () => {
  const [file, setFile] = useState('')
  const [uploadImage, { error, data, loading }] = useMutation(
    UPLOAD_PORTAL_IMAGE,
    {
      variables: {
        language: 'pt',
        title: 'test2',
        description: 'test-description',
        alt: 'test-alt',
        keyword: ['test-keyword-1', 'test-keyword-2'],
        collection: 'test-collection',
        file
      }
    }
  )

  const handleSubmit = async event => {
    event.preventDefault()
    await uploadImage()
  }

  const handleChange = event => {
    const newFile = event.target.files[0]
    setFile(newFile)
  }

  if (error) return 'Erro'
  if (loading) return 'Uploading...'
  if (data) {
    return <code>{JSON.stringify(data, null, 2)}</code>
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        file:
        <input type="file" onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Upload
