"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { HiArrowNarrowRight } from "react-icons/hi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../button";
import { SectionTitle } from "../section-title";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(500),
});

type formData = z.infer<typeof formSchema>;

export const ContactForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<formData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: formData) => {
    try {
      await axios.post("/api/contact", data);
      toast.success("Mensagem enviada com sucesso");
      reset();
    } catch (error) {
      toast.success("Algo deu errado, Tente novamente mais tarde.");
      console.log(error);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 px-6 md:py-32 flex items-center justify-center bg-gray-950"
    >
      <div className="w-full max-w-[420px] mx-auto">
        <SectionTitle
          subtitle="contato"
          title="Entre em contato comigo..."
          className="items-center text-center"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-12 w-full flex flex-col gap-4"
        >
          <input
            {...register("name")}
            type="text"
            placeholder="Nome"
            className="w-full h-14 bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-emerald-600"
          />

          <input
            {...register("email")}
            type="email"
            placeholder="E-mail"
            className="w-full h-14 bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-emerald-600"
          />

          <textarea
            {...register("message")}
            placeholder="Mensagem"
            maxLength={500}
            className="resize-none w-full h-[138px] bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-emerald-600"
          />

          <Button
            disabled={isSubmitting}
            className="w-max mt-6 mx-auto shadow-button"
          >
            Enviar mensagem <HiArrowNarrowRight size={18} />
          </Button>
        </form>
      </div>
    </section>
  );
};
