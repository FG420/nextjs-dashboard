import Navbar from '@/components/navbar/page'
import NewCoursesPage from '@/components/courses/new/page'
import VistaCoursesPage from '@/components/courses/vista/page'


export default function Home() {
  return (
    <main className="">
      <Navbar/>
      <VistaCoursesPage/>
      
    </main >
  )
}
