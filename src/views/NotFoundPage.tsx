

export function NotFoundPage() {
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-nav-bar-selected">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page introuvable</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Désolé, nous n'avons pas trouvé la page que vous recherchez.</p>
            
          </div>
        </main>
      </>
    )
  }
  