"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Form } from "@/components/ui/form"
import { aspectRatioOptions, defaultValues, transformationTypes } from "@/constants"
import { CustomField } from "./CustomField"
import { Input } from "../ui/input"
import { useState } from "react"
import { AspectRatioKey } from "@/lib/utils"
import { Button } from "../ui/button"

// will be the schema of the form 
export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string()
})


const TransformationForm = ({ action, data = null, userId, type, creditBalance }: TransformationFormProps) => {  // this props contain action, userId, type, creditBalance,data, config

  const TransformationType = transformationTypes[type] // the types are restore, fill, remove, recolor
  const [image, setImage] = useState(data)
  const [newTransformation, setNewTransformation] = useState<Transformations | null>(null)  // here the transformations are types which contain all the types of the transformation types

  const initialValues = data && action === 'Update' ? {
    title: data?.title,
    aspectRatio: data?.aspectRatio,
    color: data?.color,
    prompt: data?.prompt,
    publicId: data?.publicId,
  } : defaultValues;  // this default values is coming from the constants



  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }


  const onSelectFieldHandler = (Value: string, onChangeField: (value: string) => void) => {

  }


  const onInputChangeHandler = (fieldName: string, value: string, type: string, onChangeField: (value: string) => void) => {

  }



  // Main function which is returing the payload
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomField
          control={form.control}
          name="title"
          formLabel="Image Title"
          className="w-full"
          render={({ field }) => <Input className="input-field" />}
        />

        {
          type === 'fill' && (
            <CustomField
              control={form.control}
              name="aspectRatio"
              formLabel="AspectRatio"
              className="w-full"
              render={({ field }) =>
                <Select onValueChange={(value) => onSelectFieldHandler(value, field.onChange)} >
                  <SelectTrigger className="select-field">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      Object.keys(aspectRatioOptions).map((key) => (
                        <SelectItem key={key} value={key} className="select-item">
                          {aspectRatioOptions[key as AspectRatioKey].label}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>

              }
            />
          )
        }

        {
          (type === "remove" || type === "recolor") && (
            <div className="prompt-field">
              <CustomField
                control={form.control}
                name="prompt"
                formLabel={
                  type === 'remove' ? "Object to Remove" : "Object to Recolor"
                }
                className="w-full"
                render={({ field }) => (
                  <Input
                    value={field.Value}
                    className="input-field"
                    onChange={(e) => onInputChangeHandler(
                      'prompt',
                      e.target.value,
                      type,
                      field.onChange
                    )}
                  />
                )}
              />
              {
                type === "recolor" && (
                  <CustomField
                    control={form.control}
                    name="color"
                    formLabel="Replacement Color"
                    className="w-full"
                    render={({ field }) => (
                      <Input
                        value={field.Value}
                        className="input-field"
                        onChange={(e) => onInputChangeHandler(
                          'color',
                          e.target.value,
                          "recolor",
                          field.onChange
                        )}
                      />
                    )}
                  />
                )
              }
            </div>
          )
        }
        <Button type="submit" className="submit-button capitalize">Submit</Button>
      </form>
    </Form>
  )
}

export default TransformationForm