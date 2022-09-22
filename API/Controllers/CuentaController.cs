using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOS;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CuentaController : BaseApiController
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly ITokenService tokenService;
        private readonly IMapper mapper;

        public CuentaController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
            ITokenService tokenService, IMapper mapper)
        {
            this.signInManager = signInManager;
            this.tokenService = tokenService;
            this.mapper = mapper;
            this.userManager = userManager;
            
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UsuarioDTO>> GetCurrentUser()
        {
            var user = await userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
            //var user = await userManager.FindByEmailFromClaimsPrinciple(User);

            return new UsuarioDTO
            {
                Email = user.Email,
                Token = tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpGet("EmailExiste")]
        public async Task<ActionResult<bool>> CheckEmailExiste([FromQuery] string email)
        {
            return await userManager.FindByEmailAsync(email) != null;
        } 

        [Authorize]
        [HttpGet("Address")]
        public async Task<ActionResult<AddressDTO>> GetUserAddress()
        {
            //Con include de address: extender el usermanager
            var user = await userManager.FindByEmailWithAddressAsync(HttpContext.User);

            return mapper.Map<Address, AddressDTO>(user.Address);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UsuarioDTO>> Login(LoginDTO loginDTO)
        {
            var user = await userManager.FindByEmailAsync(loginDTO.Email);

            if(user == null) return Unauthorized(new ApiResponse(401));

            var result = await signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

            if(!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UsuarioDTO
            {
                Email = user.Email,
                Token = tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
            
        }

        [HttpPost("registro")]
        public async Task<ActionResult<UsuarioDTO>> Registro(RegistroDTO registroDTO)
        {
            if(CheckEmailExiste(registroDTO.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse{
                    Errors = new []{"Email ya esta en uso"}
                });
                
            }
            var user = new AppUser
            {
                DisplayName = registroDTO.DisplayName,
                Email = registroDTO.Email,
                UserName = registroDTO.Email,
            };

            var result = await userManager.CreateAsync(user, registroDTO.Password);

            if(!result.Succeeded) return BadRequest(new ApiResponse(400));

            return new UsuarioDTO{
                DisplayName = user.DisplayName,
                Token = tokenService.CreateToken(user),
                Email = user.Email
            };
        }

        [Authorize]
        [HttpPut("Address")]
        public async Task<ActionResult<AddressDTO>> UpdateUserAddress(AddressDTO address)
        {
            var user = await userManager.FindByEmailWithAddressAsync(HttpContext.User);

            user.Address = mapper.Map<AddressDTO, Address>(address);

            var result = await userManager.UpdateAsync(user);

            if(result.Succeeded) return Ok(mapper.Map<Address, AddressDTO>(user.Address));

            return BadRequest("Problema para actualizar el Address");
        }


    }
}