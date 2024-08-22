import Header from '@/components/shared/Header'
import { transformationTypes } from "@/constants"
import TransformationForm from '@/components/shared/TransformationForm'
import { auth } from '@clerk/nextjs/server'
import { getUserById } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {

  const Transformation = transformationTypes[type]
  const { userId } = auth(); // this is current userId which is coming from the clerk

  if (!userId) redirect('/sign-in')
  const user = await getUserById(userId)   // since we don't need to pass clerk id as we need to pass only the userId coming from the mongodb database


  return (
    <>
      <Header
        title={Transformation.title}
        subtitle={Transformation.subTitle}
      />

      <section className="mt-14">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={Transformation.type as TransformationTypeKey}   // the Transformation types have like restore, background reomve, object remove 
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransformationTypePage