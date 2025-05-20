"use client";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Box,
  TextField,
} from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { AnyAaaaRecord } from "dns";


const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);


  
  useEffect(() => {
    
  }, []);


  const handleChange = (data: any) => {
   
  };

 const schema: Yup.ObjectSchema<any> = Yup.object({
  
  });
  const defaultValues = {
   
  };
  return (
    <>
    </>
  );
};
export default Page;