import Header from '@/components/shared/Header'
import React from 'react'
import {transformationTypes} from "@/constants"

const AddTransformationTypePage = ({ params: {type}}: SearchParamProps) => {

  const Transformation = transformationTypes[type]
  return (
    <Header
      title={Transformation.title}
      subtitle={Transformation.subTitle}
    />
  )
}

export default AddTransformationTypePage