import "./Upload.css"
import Form from "../../Components/Form/Form"

export default function Upload() {
  return (
    <section className="Upload">
    <main>
      <Form button="submit" title='' file="true" bookName="" url="/api/upload"/>
    </main>
  </section>
  )
}
