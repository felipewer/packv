import '@/app/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet='UTF-8' />
        <title>PacKV - Compressed Key Value Store</title>
        <meta
          name='title'
          content='PacKV - Compressed Key Value Store'
        />
        <meta
          name='description'
          content='A compressed key value store for small textual content. 
                  Post content to have it compressed and encoded into a url. 
                  Access the url to retrieve the original value.'
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
